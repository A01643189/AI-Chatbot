import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

type Message = {
    role: 'user' | 'assistant'
    content: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { messages } = req.body as { messages: Message[] }

    try {
        const chatResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
        })

        const reply = chatResponse.choices[0]?.message?.content || 'I am not sure how to respond.'

        return res.status(200).json({ reply })
    } catch (error) {
        console.error('OpenAI API Error:', error)
        return res.status(500).json({ error: 'Failed to communicate with OpenAI API' })
    }
}
