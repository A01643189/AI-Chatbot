import { useEffect, useState, useRef } from 'react'
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useTheme } from '@/context/theme-provider' // Import theme hook

type Message = {
    role: 'user' | 'assistant' | 'typing'
    content: string
}

export default function Chatbot() {
    const { theme } = useTheme() // Get current theme
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! How can I assist you today?' }
    ])
    const [input, setInput] = useState<string>('')
    const [sessionId, setSessionId] = useState<string>('')
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let storedSessionId = localStorage.getItem('sessionId')
        if (!storedSessionId) {
            storedSessionId = Date.now().toString()
            localStorage.setItem('sessionId', storedSessionId)
        }
        setSessionId(storedSessionId)
    }, [])

    useEffect(() => {
        if (!sessionId) return

        const loadChatHistory = async () => {
            const q = query(
                collection(db, `chats/${sessionId}/messages`),
                orderBy('createdAt', 'asc')
            )
            const querySnapshot = await getDocs(q)
            const loadedMessages: Message[] = querySnapshot.docs.map(doc => doc.data() as Message)

            if (loadedMessages.length > 0) {
                setMessages(loadedMessages)
            }
        }

        loadChatHistory()
    }, [sessionId])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = async () => {
        if (!input.trim() || !sessionId || isTyping) return

        const userMessage: Message = { role: 'user', content: input }
        const newMessages: Message[] = [...messages, userMessage]
        setMessages(newMessages)
        setInput('')

        await addDoc(collection(db, `chats/${sessionId}/messages`), {
            ...userMessage,
            createdAt: Date.now(),
        })

        setIsTyping(true)
        setMessages([...newMessages, { role: 'typing', content: 'AI is typing...' }])

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            })

            const data = await response.json()

            const updatedMessages: Message[] = [
                ...newMessages.filter(msg => msg.role !== 'typing'),
                { role: 'assistant', content: data.reply }
            ]
            setMessages(updatedMessages)
            setIsTyping(false)

            await addDoc(collection(db, `chats/${sessionId}/messages`), {
                role: 'assistant',
                content: data.reply,
                createdAt: Date.now(),
            })
        } catch (error) {
            console.error('❌ Error fetching AI response:', error)
            setMessages([
                ...newMessages.filter(msg => msg.role !== 'typing'),
                { role: 'assistant', content: 'Sorry, something went wrong. Try again later.' }
            ])
            setIsTyping(false)
        }
    }

    return (
        <div
            className="flex flex-col items-center justify-center h-screen transition-colors"
            style={{
                backgroundColor: "var(--background)",
                color: "var(--foreground)"
            }}
        >
            <h1 className="text-5xl font-bold mb-4">AI Chatbot</h1>
            <div
                className="w-full max-w-2xl h-[60vh] border border-gray-300 p-4 rounded-lg overflow-y-auto transition-colors"
                style={{
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                    border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.2)"
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 max-w-[80%] rounded-lg transition-all`}
                        style={{
                            backgroundColor: msg.role === 'user' ? "#007BFF" : msg.role === 'typing' ? "#444" : "#DDD",
                            color: msg.role === 'user' ? "white" : msg.role === 'typing' ? "#AAA" : "black",
                            alignSelf: msg.role === 'user' ? "flex-end" : "flex-start",
                        }}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <div className="mt-4 flex w-full max-w-2xl gap-2">
                <input
                    className="flex-1 p-2 border rounded-md transition-colors"
                    style={{
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.2)"
                    }}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button
                    className="p-2 rounded-md hover:opacity-80 transition"
                    style={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        opacity: isTyping ? 0.5 : 1
                    }}
                    onClick={sendMessage}
                    disabled={isTyping}
                >
                    {isTyping ? '...' : 'Send'}
                </button>
            </div>
        </div>
    )
}
