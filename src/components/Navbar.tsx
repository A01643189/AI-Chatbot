import Link from "next/link"
import { useTheme } from "@/context/theme-provider"
import { motion } from "framer-motion"

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 backdrop-blur-md bg-opacity-70 shadow-md z-50"
      style={{
        backgroundColor: theme === "dark" ? "rgba(15, 15, 15, 0.8)" : "rgba(255, 255, 255, 0.8)",
        color: theme === "dark" ? "#e0e0e0" : "#171717",
        borderBottom: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Left Section: Logo / Home */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href="/">
          <span className="text-lg font-bold cursor-pointer hover:opacity-80 transition">
            🚀 My Portfolio
          </span>
        </Link>
      </motion.div>

      {/* Center Section: Navigation Links */}
      <div className="hidden md:flex gap-6 text-lg">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href="/chatbot">
            <span className="cursor-pointer hover:opacity-80 transition">🤖 Chatbot</span>
          </Link>
        </motion.div>
      </div>

      {/* Right Section: Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="p-2 rounded-full transition"
        style={{
          backgroundColor: theme === "dark" ? "#222" : "#f0f0f0",
          color: theme === "dark" ? "#fff" : "#000",
          border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.2)"
        }}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </motion.button>
    </motion.nav>
  )
}
