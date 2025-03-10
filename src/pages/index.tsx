import { useRouter } from "next/router"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function Portfolio() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <motion.h1
        className="text-5xl font-extrabold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My AI Components Portfolio ✨
      </motion.h1>

      <motion.p
        className="text-lg text-gray-300 mb-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Explore interactive AI-powered web components.
      </motion.p>

      {/* Grid of AI Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Chatbot */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/chatbot")}
          className="cursor-pointer"
        >
          <Card className="p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition">
            <CardContent className="flex flex-col items-center">
              <Image
                src="/chatbot-thumbnail.png"
                alt="Chatbot"
                width={300}
                height={200}
                className="rounded-lg"
              />
              <p className="text-xl font-semibold mt-2">AI Chatbot</p>
              <Button variant="outline" className="mt-3 flex items-center gap-2">
                <Sparkles size={18} />
                Try It
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* More AI Components Can Be Added Here */}
      </div>
    </div>
  )
}
