import { useState } from 'react'

type Message = {
    role: 'user' | 'assistant'
    content: string
}

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! How can I assist you today?' }
    ])
    const [input, setInput] = useState<string>('')

    const sendMessage = async () => {
        if (!input.trim()) return

        const newMessages: Message[] = [...messages, { role: 'user', content: input }]
        setMessages(newMessages)
        setInput('')

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: newMessages }),
        })

        const data = await response.json()

        setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">AI Chatbot</h1>
            <div className="w-full max-w-2xl h-[60vh] bg-white border border-gray-300 p-4 rounded-lg overflow-y-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 max-w-[80%] rounded-lg ${
                            msg.role === 'user'
                                ? 'bg-blue-500 text-white self-end ml-auto'
                                : 'bg-gray-200 text-gray-900 self-start mr-auto'
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="mt-4 flex w-full max-w-2xl gap-2">
                <input
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    )
}
