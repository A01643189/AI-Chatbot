import Link from "next/link"
import { useTheme } from "@/context/theme-provider"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";

export default function AINavbar() {
  const { theme, toggleTheme } = useTheme()
  const [showMenu, setShowMenu] = useState(false);

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
      {/* Left Section: Hamburger Menu on Mobile */}
      <div className="md:hidden relative">
          <button 
              onClick={() => setShowMenu(!showMenu)} 
              className="text-2xl focus:outline-none"
          >
              {showMenu ? "✖️" : "☰"} {/* X for close, ☰ for open */}
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
              {showMenu && (
                  <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 w-48 bg-white dark:bg-black border rounded-md shadow-md flex flex-col"
                  >
                      {/* Move "My Portfolio" Inside Menu on Mobile */}
                      <Link href="/ai">
                          <span 
                              className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700"
                              onClick={() => setShowMenu(false)}
                          >
                              🏠 Home
                          </span>
                      </Link>

                      {/* Chatbot Link */}
                      <Link href="/ai/chatbot">
                          <span 
                              className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700"
                              onClick={() => setShowMenu(false)}
                          >
                              🤖 Chatbot
                          </span>
                      </Link>

                      {/* Form Assistant Link */}
                      <Link href="/ai/form-assistant">
                          <span 
                              className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700"
                              onClick={() => setShowMenu(false)}
                          >
                              📄 Form Assistant
                          </span>
                      </Link>
                  </motion.div>
              )}
          </AnimatePresence>
      </div>

      {/* Left Section: Navigation Links (Desktop Only) */}
      <div className="hidden md:flex gap-6 text-lg items-center">
          {/* Portfolio Link (Visible on Desktop) */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/ai">
                  <span className="cursor-pointer font-bold hover:opacity-80 transition">🏠 Home</span>
              </Link>
          </motion.div>

          {/* Chatbot Link */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/ai/chatbot">
                  <span className="cursor-pointer hover:opacity-80 transition">🤖 Chatbot</span>
              </Link>
          </motion.div>

          {/* Form Assistant Link */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/ai/form-assistant">
                  <span className="cursor-pointer hover:opacity-80 transition">📄 Form Assistant</span>
              </Link>
          </motion.div>
      </div>

      {/* Right Section: Theme Toggle (Moved to the Right) */}
      <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 rounded-full transition ml-auto"
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
