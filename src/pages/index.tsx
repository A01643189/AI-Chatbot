import { useRouter } from "next/router"
import Image from "next/image"
import { motion } from "framer-motion"
import DarkModeToggle from "@/components/DarkmodeToggle"

export default function Portfolio() {
  const router = useRouter()

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen transition-colors"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)"
      }}
    >
      <DarkModeToggle />

      {/* Hero Section with Animations */}
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My AI Components Portfolio ✨
      </motion.h1>

      <motion.p
        className="text-lg mb-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Explore interactive AI-powered web components.
      </motion.p>

      {/* Grid Layout with Staggered Animations */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {/* AI Chatbot Component */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/chatbot")}
          className="cursor-pointer p-4 rounded-lg shadow-md hover:shadow-lg transition"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}
        >
          <Image
            src="/chatbot-thumbnail.png"
            alt="Chatbot"
            width={300}
            height={200}
            className="rounded-lg"
          />
          <p className="text-xl font-semibold mt-2">AI Chatbot</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
