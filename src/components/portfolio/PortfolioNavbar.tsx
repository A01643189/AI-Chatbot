import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Work", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
];

export default function PortfolioNavbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-fit">
      <nav className="flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-md bg-white/10 dark:bg-white/5 shadow-md border border-white/20">
        {navItems.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className={`text-sm font-medium px-4 py-1 rounded-full transition duration-200
              ${
                pathname === href
                  ? "bg-white text-black dark:bg-white/90 dark:text-black shadow"
                  : "text-white hover:bg-white/10"
              }`}
          >
            {name}
          </Link>
        ))}
        <Link
          href="#contact"
          className="ml-4 bg-white text-black dark:bg-white/90 dark:text-black px-4 py-1 rounded-full font-semibold shadow hover:opacity-90 transition"
        >
          Let's Connect
        </Link>
      </nav>
    </header>
  );
}
