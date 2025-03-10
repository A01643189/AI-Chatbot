import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Portfolio() {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">My AI Components Portfolio</h1>
            <p className="text-lg text-gray-600 mb-8">Explore interactive AI-powered web components.</p>

            {/* Chatbot Card */}
            <div 
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => router.push('/chatbot')}
            >
                <Image
                    src="/chatbot-thumbnail.png" // Replace with an actual image in public/
                    alt="Chatbot"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-lg"
                />
                <p className="text-center mt-2 text-xl font-semibold">AI Chatbot</p>
            </div>
        </div>
    )
}
