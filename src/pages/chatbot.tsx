import { useEffect, useState, useRef } from 'react';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTheme } from '@/context/theme-provider';
import Navbar from "@/components/Navbar";
import { AnimatePresence, motion } from "framer-motion";

type Message = {
    role: 'user' | 'assistant' | 'typing';
    content: string;
};

const modelOptions = {
    openai: ["gpt-3.5-turbo"],
    deepseek: ["deepseek-chat"],
    gemini: ["gemini-1.5-pro-latest"],
    claude: ["claude-3-5-sonnet-20241022"]
};

const modelLogos:Record<string, { light: string; dark: string }> = {
    openai: {
        light: "/openai-light.png",
        dark: "/openai-dark.png",
    },
    deepseek: {
        light: "/deepseek.png",
        dark: "/deepseek.png",
    },
    gemini: {
        light: "/gemini.png",
        dark: "/gemini.png",
    },
    claude: {
        light: "/claude.png",
        dark: "/claude.png",
    },
};

const logoSizes: Record<string, string> = {
    openai: "w-10 h-10",  
    deepseek: "w-12 h-12", 
    gemini: "w-10 h-10",   
    claude: "w-12 h-10",   
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

    const [provider, setProvider] = useState<'openai' | 'deepseek' | 'gemini' | 'claude'>('openai');
    const [model, setModel] = useState<string>('gpt-3.5-turbo');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const modelLogo = modelLogos[provider] || "openai.png";

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

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

            <motion.h1 className="text-4xl font-bold mt-16 mb-4 flex items-center gap-2"
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
            >
                AI Chatbot 
                <img
                    src={theme === "dark" ? modelLogos[provider].dark : modelLogos[provider].light}
                    alt={`${provider} logo`}
                    className={`${logoSizes[provider]}`}
                />
            </motion.h1>

            {/* Provider & Model Selection Dropdown */}
            <div ref={dropdownRef} className="relative mb-4 flex flex-col items-center gap-2">
                <button 
                    className={`p-2 rounded-md shadow-md hover:opacity-80 transition-all ${
                        theme === "dark" ? "bg-neutral-800 text-white" : "bg-gray-200 text-black"
                    }`} 
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <strong>{model}</strong> ▼
                </button>

                <AnimatePresence>
                    {showDropdown && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`absolute top-full mt-2 w-48 rounded-md shadow-lg transition-all ${
                                theme === "dark" ? "bg-neutral-800 text-gray-300" : "bg-white text-gray-800"
                            }`}
                        
                        >
                            {Object.entries(modelOptions).map(([prov, models]) => (
                                <div key={prov}>
                                    <p className={`px-3 py-1 text-gray-700 font-bold ${
                                theme === "dark" ? "text-white" : "text-gray-700"
                            }`}>{prov.toUpperCase()}</p>
                                    {models.map((m) => (
                                        <button
                                            key={m}
                                            className={`block w-full px-3 py-2 text-left ${
                                theme === "dark" ? "hover:bg-neutral-600" : "hover:bg-gray-100"
                            }`}
                                            onClick={() => {
                                                setProvider(prov as "openai" | "deepseek" | "gemini" | "claude");
                                                setModel(m);
                                                setShowDropdown(false);
                                            }}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            
            {/* Refresh Chat Button TESTING PURPOSES*/}
            {/*
            <motion.button className="mb-4 p-2 px-4 rounded-md shadow-md transition hover:opacity-80" style={{ backgroundColor: "#ff4757", color: "white" }} onClick={clearChatHistory} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                🔄 Reset Chat
            </motion.button>
            */}

            {/* Chatbox */}
            <motion.div className="w-full max-w-2xl h-[60vh] border p-4 rounded-lg overflow-y-auto transition-colors shadow-md"
                style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#f9f9f9", color: theme === "dark" ? "#e0e0e0" : "#171717", border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.1)" }}>
                <div className="flex flex-col gap-2">
                    {messages.map((msg, index) => (
                        <motion.div 
                            key={index} 
                            className={`p-2 rounded-lg transition-all max-w-fit break-words ${
                                msg.role === 'user' 
                                    ? "bg-blue-500 text-white self-end ml-auto text-right"  // Align user messages to the right
                                    : "bg-gray-300 text-black self-start mr-auto text-left" // Align AI messages to the left
                            }`}
                            style={{ whiteSpace: "pre-wrap" }} // ✅ Ensures new lines are respected
                        >
                            {msg.content}
                        </motion.div>
                    ))}
                </div>


                <div ref={chatEndRef} />
            </motion.div>

            {/* Input Box */}
            <motion.div className="mt-4 flex w-full max-w-2xl gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                <input 
                    ref={inputRef} 
                    className={`flex-1 p-2 border rounded-md transition-color ${
                        theme === "dark" ? "text-white" : "text-gray-600"
                    }`} 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={handleKeyPress} 
                    placeholder="Type your message..." 
                />

                <motion.button 
                    className="flex items-center justify-center rounded-full border-2 transition-all"
                    style={{ 
                        borderColor: theme === "dark" ? "white" : "black", 
                        color: theme === "dark" ? "white" : "black", 
                        width: "40px", 
                        height: "40px", 
                        backgroundColor: "transparent", // ✅ No fill color
                    }} 
                    onClick={sendMessage} 
                    disabled={isTyping} 
                    whileHover={{ scale: 1.1, transition: { duration: 0.15 } }} // ⚡ Faster hover animation
                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }} // ⚡ Faster tap animation
                >
                    {isTyping ? '...' : (
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                        >
                            <path d="M2 21L23 12 2 3v7l15 2-15 2v7z"/>
                        </svg>
                    )}
                </motion.button>
            </motion.div>
        </div>
    );
}
