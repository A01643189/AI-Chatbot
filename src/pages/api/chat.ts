import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import fetch from 'node-fetch';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages, provider, model } = req.body as { messages: Message[], provider: 'openai' | 'deepseek', model: string };

    try {
        let reply = "I'm not sure how to respond.";

        if (provider === "openai") {
            // ✅ OpenAI API Call
            const chatResponse = await openai.chat.completions.create({
                model: model || 'gpt-3.5-turbo', // Default to GPT-3.5
                messages,
            });

            reply = chatResponse.choices?.[0]?.message?.content || "No response received.";
        } else if (provider === "deepseek") {
            // ✅ DeepSeek API Call
            const deepSeekResponse = await fetch('https://api.deepseek.com/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ model: 'deepseek-chat', messages }),
            });

            const deepSeekData = await deepSeekResponse.json();
            reply = deepSeekData.choices?.[0]?.message?.content || "No response from DeepSeek.";
        }

        return res.status(200).json({ reply });

    } catch (error) {
        console.error('AI API Error:', error);
        return res.status(500).json({ error: 'Failed to communicate with the AI API' });
    }
}
