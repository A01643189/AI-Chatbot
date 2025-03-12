import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "light",
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme
    setTheme(storedTheme || "light")
  }, [])

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme) // Set theme attribute
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
