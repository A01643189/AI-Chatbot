import { NextApiRequest, NextApiResponse } from 'next';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages, provider, model } = req.body;

    try {
        let apiResponse;

        if (provider === 'openai') {
            apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: model,
                    messages: messages,
                }),
            });

        } else if (provider === 'deepseek') {
            apiResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: model,
                    messages: messages,
                }),
            });

        } else if (provider === 'gemini') {
            apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: messages.map((msg: { content: any; }) => ({ text: msg.content })) }],
                }),
            });

        } else {
            return res.status(400).json({ error: 'Invalid AI provider selected' });
        }

        if (!apiResponse.ok) {
            throw new Error(`API request failed: ${apiResponse.statusText}`);
        }

        const data = await apiResponse.json();

        // Extract reply correctly based on the provider response
        let reply = "Sorry, I couldn't generate a response.";
        if (provider === 'openai' || provider === 'deepseek') {
            reply = data.choices?.[0]?.message?.content || reply;
        } else if (provider === 'gemini') {
            reply = data.candidates?.[0]?.content?.parts?.[0]?.text || reply;
        }

        return res.status(200).json({ reply });

    } catch (error) {
        console.error('AI API Error:', error);
        return res.status(500).json({ error: 'Failed to communicate with the AI API' });
    }
}
