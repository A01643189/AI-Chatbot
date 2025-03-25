import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

export default function EcommerceNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-black shadow-md px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <Link href="/ecommerce">
        <span className="text-xl font-bold tracking-tight cursor-pointer">
          🧢 StreetWear
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6 font-medium text-sm">
        <Link href="/ecommerce">Home</Link>
        <Link href="/ecommerce/shop">Shop</Link>
        <Link href="/ecommerce/about">About</Link>
        <Link href="/ecommerce/contact">Contact</Link>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 relative">
        <Link href="/ecommerce/cart" className="relative text-xl">
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖️" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 flex flex-col p-4 md:hidden"
          >
            <Link href="/ecommerce" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/ecommerce/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/ecommerce/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/ecommerce/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link href="/ecommerce/cart" onClick={() => setMenuOpen(false)}>Cart {totalItems > 0 && `(${totalItems})`}</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
