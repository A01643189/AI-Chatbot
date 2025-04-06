import { useEffect, useState } from "react";
import Navbar from "@/components/ai/AINavbar";

const initialData = { name: "", email: "", address: "", message: "" };

export default function FormFiller() {
    const [formData, setFormData] = useState(initialData);
    const [suggestions, setSuggestions] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (typingTimeout) clearTimeout(typingTimeout);
        const timeout = setTimeout(() => getSuggestions({ ...formData, [name]: value }), 800);
        setTypingTimeout(timeout);
    };

    const getSuggestions = async (data: typeof formData) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/form-suggest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const res = await response.json();
            setSuggestions(res.suggestions);
        } catch (error) {
            console.error("❌ AI Suggestion Error:", error);
        }
        setIsLoading(false);
    };

    const applySuggestion = (field: keyof typeof formData) => {
        if (formData[field] === "") {
            setFormData(prev => ({ ...prev, [field]: suggestions[field] }));
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black transition-colors">
            <Navbar />
            <div className="max-w-lg w-full p-6 mt-20 border rounded-md shadow-md bg-white dark:bg-[#1e1e1e]">
                <h2 className="text-xl font-bold mb-2 text-black dark:text-white">AI Form Assistant</h2>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                    Start typing and the assistant will suggest values. Press <span className="font-semibold">Tab</span> to autocomplete.
                </p>

                <div className="space-y-4">
                    {["name", "email", "address"].map((field) => (
                        <div key={field} className="flex flex-col">
                            <label
                                htmlFor={field}
                                className="font-medium mb-1 capitalize text-sm text-gray-800 dark:text-gray-200"
                            >
                                {field}
                            </label>
                            <input
                                type={field === "email" ? "email" : "text"}
                                id={field}
                                name={field}
                                value={formData[field as keyof typeof formData]}
                                onChange={handleChange}
                                onKeyDown={(e) => {
                                    if (
                                        e.key === "Tab" &&
                                        suggestions[field as keyof typeof formData] &&
                                        !formData[field as keyof typeof formData]
                                    ) {
                                        e.preventDefault();
                                        applySuggestion(field as keyof typeof formData);
                                    }
                                }}
                                className="w-full p-2 border rounded bg-transparent text-black dark:text-white dark:border-gray-600"
                            />
                            {formData[field as keyof typeof formData] === "" &&
                                suggestions[field as keyof typeof formData] && (
                                    <p className="text-sm text-gray-400 italic mt-1">
                                        {suggestions[field as keyof typeof formData]}
                                    </p>
                                )}
                        </div>
                    ))}

                    <div className="flex flex-col">
                        <label
                            htmlFor="message"
                            className="font-medium mb-1 text-sm text-gray-800 dark:text-gray-200"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Tab" && suggestions.message && !formData.message) {
                                    e.preventDefault();
                                    applySuggestion("message");
                                }
                            }}
                            rows={4}
                            className="w-full p-2 border rounded bg-transparent text-black dark:text-white dark:border-gray-600"
                        />
                        {formData.message === "" && suggestions.message && (
                            <p className="text-sm text-gray-400 italic mt-1">
                                {suggestions.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
