import { useEffect, useState, useRef } from 'react'
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

type Message = {
    role: 'user' | 'assistant' | 'typing'
    content: string
}

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! How can I assist you today?' }
    ])
    const [input, setInput] = useState<string>('')
    const [sessionId, setSessionId] = useState<string>('') // Store user session
    const [isTyping, setIsTyping] = useState<boolean>(false) // Track AI typing state
    const chatEndRef = useRef<HTMLDivElement>(null) // Reference for auto-scrolling

    // 🎯 Generate session ID client-side
    useEffect(() => {
        let storedSessionId = localStorage.getItem('sessionId')
        if (!storedSessionId) {
            storedSessionId = Date.now().toString()
            localStorage.setItem('sessionId', storedSessionId)
        }
        setSessionId(storedSessionId)
    }, [])

    // 🛠 Load chat history for this session
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

    // 🔽 Auto-scroll to latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = async () => {
        if (!input.trim() || !sessionId || isTyping) return

        const userMessage: Message = { role: 'user', content: input }
        const newMessages: Message[] = [...messages, userMessage]
        setMessages(newMessages)
        setInput('')

        // Save user message in Firestore
        await addDoc(collection(db, `chats/${sessionId}/messages`), {
            ...userMessage,
            createdAt: Date.now(),
        })

        // Show AI typing indicator
        setIsTyping(true)
        setMessages([...newMessages, { role: 'typing', content: 'AI is typing...' }])

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            })

            const data = await response.json()

            // Remove typing indicator and add AI response
            const updatedMessages: Message[] = [
                ...newMessages.filter(msg => msg.role !== 'typing'),
                { role: 'assistant', content: data.reply }
            ]
            setMessages(updatedMessages)
            setIsTyping(false)

            // Save AI message to Firebase
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
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-5xl font-bold mb-4 text-black">AI Chatbot</h1>
            <div className="w-full max-w-2xl h-[60vh] bg-white border border-gray-300 p-4 rounded-lg overflow-y-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 max-w-[80%] rounded-lg ${
                            msg.role === 'user'
                                ? 'bg-blue-500 text-white self-end ml-auto'
                                : msg.role === 'typing'
                                ? 'bg-gray-300 text-gray-600 self-start mr-auto italic'
                                : 'bg-gray-200 text-gray-900 self-start mr-auto'
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                {/* Invisible div to auto-scroll to latest message */}
                <div ref={chatEndRef} />
            </div>
            <div className="mt-4 flex w-full max-w-2xl gap-2">
                <input
                    className="flex-1 p-2 border border-gray-300 rounded-md text-black"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={sendMessage}
                    disabled={isTyping} // Disable send button while AI is typing
                >
                    {isTyping ? '...' : 'Send'}
                </button>
            </div>
        </div>
    )
}
