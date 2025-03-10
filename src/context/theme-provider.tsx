import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "light",
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null) // Prevent hydration mismatch

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme
    setTheme(storedTheme || "light") // Load stored theme
  }, [])

  useEffect(() => {
    if (theme) {
      document.documentElement.dataset.theme = theme
      document.documentElement.style.setProperty("--background", theme === "light" ? "#ffffff" : "#0a0a0a")
      document.documentElement.style.setProperty("--foreground", theme === "light" ? "#171717" : "#ededed")

      // 🚀 Apply theme to <body> to force style update
      document.body.style.backgroundColor = theme === "light" ? "#ffffff" : "#0a0a0a"
      document.body.style.color = theme === "light" ? "#171717" : "#ededed"

      localStorage.setItem("theme", theme)
    }
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"))

  if (theme === null) return null // Prevent hydration error

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
