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
    const [file, setFile] = useState<File | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [provider, setProvider] = useState<'openai' | 'deepseek' | 'gemini' | 'claude'>('openai');
    const [model, setModel] = useState<string>('gpt-3.5-turbo');

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
        if ((!input.trim() && !file) || !sessionId || isTyping) return;

        const userMessage: Message = { role: 'user', content: input };
        const newMessages: Message[] = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');

        await addDoc(collection(db, `chats/${sessionId}/messages`), {
            ...userMessage,
            createdAt: Date.now(),
        });

        setIsTyping(true);
        setMessages([...newMessages, { role: 'typing', content: 'AI is processing...' }]);

        const formData = new FormData();
        formData.append("messages", JSON.stringify(newMessages));
        formData.append("provider", provider);
        formData.append("model", model);
        if (file) formData.append("file", file);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            let reply = typeof data.reply === 'string' ? data.reply.trim() : "Sorry, I couldn't generate a response.";

            const updatedMessages: Message[] = [
                ...newMessages.filter(msg => msg.role !== 'typing'),
                { role: 'assistant', content: reply }
            ];
            setMessages(updatedMessages);
            setIsTyping(false);

            await addDoc(collection(db, `chats/${sessionId}/messages`), {
                role: 'assistant',
                content: reply,
                createdAt: Date.now(),
            });

            setFile(null);
        } catch (error) {
            console.error('❌ Error fetching AI response:', error);
            setMessages([
                ...newMessages.filter(msg => msg.role !== 'typing'),
                { role: 'assistant', content: 'Sorry, something went wrong. Try again later.' }
            ]);
            setIsTyping(false);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen transition-colors" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
            <Navbar />

            <motion.h1 className="text-4xl font-bold mt-16 mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                AI Chatbot 🤖
            </motion.h1>

            <div className="mb-4 flex flex-col items-center gap-2">
                <span className="text-lg font-semibold">Current Model: <span className="text-blue-500">{model}</span></span>
                <select
                    className="p-2 rounded-md border border-gray-300 shadow-md"
                    value={provider}
                    onChange={(e) => {
                        const selectedProvider = e.target.value as 'openai' | 'deepseek' | 'gemini' | 'claude';
                        setProvider(selectedProvider);

                        if (selectedProvider === "openai") {
                            setModel("gpt-3.5-turbo");
                        } else if (selectedProvider === "deepseek") {
                            setModel("deepseek-chat");
                        } else if (selectedProvider === "gemini") {
                            setModel("gemini-1.5-pro-latest");
                        } else if (selectedProvider === "claude") {
                            setModel("claude-3-5-sonnet-20241022");
                        }
                    }}
                >
                    <option value="openai">OpenAI (GPT-3.5/GPT-4)</option>
                    <option value="deepseek">DeepSeek AI</option>
                    <option value="gemini">Gemini 1.5 Pro</option>
                    <option value="claude">Claude 3.5 Sonnet</option>
                </select>
            </div>

            <motion.button className="mb-4 p-2 px-4 rounded-md shadow-md transition hover:opacity-80" style={{ backgroundColor: "#ff4757", color: "white" }} onClick={() => setMessages([{ role: 'assistant', content: 'Hello! How can I assist you today?' }])}>
                🔄 Reset Chat
            </motion.button>

            <motion.div className="w-full max-w-2xl h-[60vh] border p-4 rounded-lg overflow-y-auto transition-colors shadow-md">
                {messages.map((msg, index) => (
                    <motion.div key={index} className={`mb-2 p-2 max-w-[80%] rounded-lg`} style={{ backgroundColor: msg.role === 'user' ? "#007BFF" : "#DDD", color: msg.role === 'user' ? "white" : "black" }}>
                        {msg.content}
                    </motion.div>
                ))}
                <div ref={chatEndRef} />
            </motion.div>

            <motion.div className="mt-4 flex w-full max-w-2xl gap-2">
                <input ref={inputRef} className="flex-1 p-2 border rounded-md transition-colors" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} placeholder="Type your message..." />
                <input type="file" className="p-2 border rounded-md" onChange={handleFileChange} />
                <motion.button className="p-2 rounded-md transition" style={{ backgroundColor: "#007BFF", color: "white" }} onClick={sendMessage} disabled={isTyping}>
                    {isTyping ? '...' : 'Send'}
                </motion.button>
            </motion.div>
        </div>
    );
}
