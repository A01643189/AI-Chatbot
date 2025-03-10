import { cn } from "@/lib/utils"

export function Button({
  className = "",
  variant = "default",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" }) {
  const base = "px-4 py-2 rounded-md font-semibold transition-all"
  const styles = {
    default: "bg-blue-500 hover:bg-blue-600 text-white",
    outline: "border border-gray-500 text-white hover:bg-gray-700",
  }

  return (
    <button className={cn(base, styles[variant], className)} {...props}>
      {children}
    </button>
  )
}
