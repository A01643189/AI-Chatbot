import Link from "next/link"
import { useTheme } from "@/context/theme-provider"
import { motion } from "framer-motion"

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav
      className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 transition-colors z-50"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderBottom: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Back to Portfolio or Home */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href="/">
          <span className="text-lg font-semibold cursor-pointer hover:opacity-80">🏠 Home</span>
        </Link>
      </motion.div>

      {/* Chatbot Link */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href="/chatbot">
          <span className="text-lg font-semibold cursor-pointer hover:opacity-80">🤖 Chatbot</span>
        </Link>
      </motion.div>

      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleTheme} 
        className="p-2 rounded-md transition"
        style={{
          backgroundColor: theme === "dark" ? "#222" : "#f0f0f0",
          color: theme === "dark" ? "#fff" : "#000",
          border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.2)"
        }}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </nav>
  )
}
