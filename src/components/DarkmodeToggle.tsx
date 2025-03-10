import { useTheme } from "@/context/theme-provider"
import { Moon, Sun } from "lucide-react"

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-gray-300 dark:bg-gray-800 p-2 rounded-full shadow-md transition"
    >
      {theme === "light" ? <Moon className="text-black" /> : <Sun className="text-yellow-400" />}
    </button>
  )
}
