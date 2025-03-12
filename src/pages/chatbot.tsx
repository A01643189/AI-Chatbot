import { useEffect, useState, useRef } from 'react';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTheme } from '@/context/theme-provider';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

type Message = {
    role: 'user' | 'assistant' | 'typing';
    content: string;
};

export default function Chatbot() {
    const { theme } = useTheme();
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! How can I assist you today?' }
    ]);
    const [input, setInput] = useState<string>('');
    const [sessionId, setSessionId] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [provider, setProvider] = useState<'openai' | 'deepseek'>('openai'); // ✅ Default: OpenAI
    const [model, setModel] = useState<string>('gpt-3.5-turbo'); // ✅ Default OpenAI Model

    useEffect(() => {
        let storedSessionId = localStorage.getItem('sessionId');
        if (!storedSessionId) {
            storedSessionId = Date.now().toString();
            localStorage.setItem('sessionId', storedSessionId);
        }
        setSessionId(storedSessionId);
    }, []);

    useEffect(() => {
        if (!sessionId) return;

        const loadChatHistory = async () => {
            const q = query(collection(db, `chats/${sessionId}/messages`), orderBy('createdAt', 'asc'));
            const querySnapshot = await getDocs(q);
            const loadedMessages: Message[] = querySnapshot.docs.map(doc => doc.data() as Message);

            if (loadedMessages.length > 0) {
                setMessages(loadedMessages);
            }
        };

        loadChatHistory();
    }, [sessionId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || !sessionId || isTyping) return;

        const userMessage: Message = { role: 'user', content: input };
        const newMessages: Message[] = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');

        await addDoc(collection(db, `chats/${sessionId}/messages`), {
            ...userMessage,
            createdAt: Date.now(),
        });

        setIsTyping(true);
        setMessages([...newMessages, { role: 'typing', content: 'AI is typing...' }]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages, provider, model }),
            });

            const data = await response.json();

            const updatedMessages: Message[] = [
                ...newMessages.filter(msg => msg.role !== 'typing'),
                { role: 'assistant', content: data.reply }
            ];
            setMessages(updatedMessages);
            setIsTyping(false);

            await addDoc(collection(db, `chats/${sessionId}/messages`), {
                role: 'assistant',
                content: data.reply,
                createdAt: Date.now(),
            });
        } catch (error) {
            console.error('❌ Error fetching AI response:', error);
            setMessages([
                ...newMessages.filter(msg => msg.role !== 'typing'),
                { role: 'assistant', content: 'Sorry, something went wrong. Try again later.' }
            ]);
            setIsTyping(false);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

    const clearChatHistory = async () => {
        if (!sessionId) return;

        const q = query(collection(db, `chats/${sessionId}/messages`));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (docSnapshot) => {
            await deleteDoc(doc(db, `chats/${sessionId}/messages`, docSnapshot.id));
        });

        setMessages([{ role: 'assistant', content: 'Hello! How can I assist you today?' }]);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen transition-colors" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
            <Navbar />

            <motion.h1 className="text-4xl font-bold mt-16 mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                AI Chatbot 🤖
            </motion.h1>

            {/* AI Model & Provider Selection */}
            <div className="mb-4 flex gap-4">
                <motion.button
                    className="p-2 px-4 rounded-md shadow-md transition hover:opacity-80"
                    style={{ backgroundColor: provider === "openai" ? "#007BFF" : "#ff4757", color: "white" }}
                    onClick={() => setProvider(provider === 'openai' ? 'deepseek' : 'openai')}
                >
                    {provider === "openai" ? "🔄 Switch to DeepSeek AI" : "🔄 Switch to OpenAI"}
                </motion.button>

                {provider === "openai" && (
                    <select className="p-2 rounded-md border" value={model} onChange={(e) => setModel(e.target.value)}>
                        <option value="gpt-3.5-turbo">GPT-3.5</option>
                        <option value="gpt-4">GPT-4</option>
                    </select>
                )}
            </div>

            {/* Refresh Chat Button */}
            <motion.button className="mb-4 p-2 px-4 rounded-md shadow-md transition hover:opacity-80" style={{ backgroundColor: "#ff4757", color: "white" }} onClick={clearChatHistory} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                🔄 Reset Chat
            </motion.button>

            {/* Chatbox */}
            <motion.div className="w-full max-w-2xl h-[60vh] border p-4 rounded-lg overflow-y-auto transition-colors shadow-md"
                style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#f9f9f9", color: theme === "dark" ? "#e0e0e0" : "#171717", border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.1)" }}>
                {messages.map((msg, index) => (
                    <motion.div key={index} className={`mb-2 p-2 max-w-[80%] rounded-lg transition-all`} style={{ backgroundColor: msg.role === 'user' ? "#007BFF" : "#DDD", color: msg.role === 'user' ? "white" : "black" }}>
                        {msg.content}
                    </motion.div>
                ))}
                <div ref={chatEndRef} />
            </motion.div>

            {/* Input Box */}
            <motion.div className="mt-4 flex w-full max-w-2xl gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                <input ref={inputRef} className="flex-1 p-2 border rounded-md transition-colors" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} placeholder="Type your message..." />

                <motion.button className="p-2 rounded-md hover:opacity-80 transition" style={{ backgroundColor: "#007BFF", color: "white", opacity: isTyping ? 0.5 : 1 }} onClick={sendMessage} disabled={isTyping} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {isTyping ? '...' : 'Send'}
                </motion.button>
            </motion.div>
        </div>
    );
}
