import { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import { IncomingForm } from 'formidable';

export const config = {
    api: {
        bodyParser: false, // Required for handling file uploads
    },
};

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'File upload error' });
        }

        try {
            // ✅ Fixing `string[] | undefined` issue:
            const messages = JSON.parse(Array.isArray(fields.messages) ? fields.messages[0] : fields.messages || '[]');
            let provider = Array.isArray(fields.provider) ? fields.provider[0] : fields.provider || '';
            let model = Array.isArray(fields.model) ? fields.model[0] : fields.model || '';
            const file = files.file ? (Array.isArray(files.file) ? files.file[0] : files.file) : null;

            let apiResponse;
            let reply = "Sorry, I couldn't generate a response.";

            /** ✅ OpenAI **/
            if (provider === 'openai') {
                const openAiModel = model.includes("turbo") ? model : "gpt-4-turbo-2024";
                const formData = new FormData();
                formData.append('model', openAiModel);
                formData.append('messages', JSON.stringify(messages));

                if (file) {
                    const fileData = fs.createReadStream(file.filepath);
                    formData.append('file', fileData as any);
                }

                apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    },
                    body: formData,
                });

                const data = await apiResponse.json();
                reply = data.choices?.[0]?.message?.content || reply;

            /** ✅ DeepSeek AI (Does NOT support files) **/
            } else if (provider === 'deepseek') {
                if (file) {
                    return res.status(400).json({ error: 'DeepSeek AI does not support file uploads' });
                }

                apiResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ model, messages }),
                });

                const data = await apiResponse.json();
                reply = data.choices?.[0]?.message?.content || reply;

            /** ✅ Gemini (Supports files in Gemini 1.5 Pro) **/
            } else if (provider === 'gemini') {
                if (file && !model.includes("1.5")) {
                    model = "gemini-1.5-pro";
                }

                const fileData = file ? fs.readFileSync(file.filepath, 'base64') : null;
                const geminiBody = {
                    contents: [
                        { parts: messages.map((msg: { content: any }) => ({ text: msg.content })) },
                        ...(file ? [{ parts: [{ inlineData: { mimeType: file.mimetype, data: fileData } }] }] : [])
                    ],
                };

                apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(geminiBody),
                });

                const data = await apiResponse.json();
                reply = data.candidates?.[0]?.content?.parts?.[0]?.text || reply;

            /** ✅ Claude (Supports files only in Claude Opus, NOT Sonnet or Haiku) **/
            } else if (provider === 'claude') {
                if (file && !model.includes("opus")) {
                    model = "claude-3-opus-20240229";
                }

                const anthropic = new Anthropic({ apiKey: CLAUDE_API_KEY });

                const claudeBody = {
                    model,
                    max_tokens: 1024,
                    messages: messages.map((msg: { role: string; content: string }) => ({
                        role: msg.role === 'user' ? 'user' : 'assistant',
                        content: msg.content,
                    })),
                };

                apiResponse = await anthropic.messages.create(claudeBody);
                reply = Array.isArray(apiResponse?.content)
                    ? apiResponse.content.map(part => ('text' in part ? (part as { text: string }).text : '')).join("\n")
                    : apiResponse?.content || reply;

            } else {
                return res.status(400).json({ error: 'Invalid AI provider selected' });
            }

            return res.status(200).json({ reply });

        } catch (error) {
            console.error('AI API Error:', error);
            return res.status(500).json({ error: 'Failed to communicate with the AI API' });
        }
    });
}
