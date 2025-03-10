import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "@/context/theme-provider"
import { Analytics } from "@vercel/analytics/react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  )
}
