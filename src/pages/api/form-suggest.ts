import { NextApiRequest, NextApiResponse } from "next";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, address, message } = req.body;

    const prompt = `
You are an AI form assistant. Based on the user's current input, fill in any missing fields with realistic and relevant values.

Respond ONLY with a valid JSON object like:
{
  "name": "Alex Rodriguez",
  "email": "alex@example.com",
  "address": "123 Main Street, Anytown, CA 12345",
  "message": "Hello! I hope this message finds you well..."
}

Do not explain anything.

Current input:
{
  "name": "${name}",
  "email": "${email}",
  "address": "${address}",
  "message": "${message}"
}
    `;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are an AI assistant that helps fill out forms with smart suggestions." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.6,
            }),
        });

        const data = await response.json();
        const aiReply = data.choices?.[0]?.message?.content || "{}";

        // Clean up markdown formatting if it exists
        const cleaned = aiReply
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const suggestions = JSON.parse(cleaned);

        return res.status(200).json({ suggestions });
    } catch (error) {
        console.error("AI API Error:", error);
        return res.status(500).json({ error: "Failed to get AI suggestions" });
    }
}
