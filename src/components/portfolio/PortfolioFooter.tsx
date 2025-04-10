import Link from "next/link";

export default function PortfolioFooter() {
  return (
    <footer className="w-full px-6 py-12 bg-black text-white mt-24 border-t border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        {/* 🌟 Your Info */}
        <div>
          <h3 className="text-lg font-bold mb-2">Javier Romo</h3>
          <p className="text-gray-400">
            Crafting web experiences at lightning speed.
          </p>
        </div>

        {/* 📁 Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Links</h3>
          <ul className="space-y-1 text-gray-400">
            <li><Link href="/ecommerce" className="hover:underline">Ecommerce</Link></li>
            <li><Link href="/ai" className="hover:underline">AI Components</Link></li>
            <li><Link href="/#contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* 🔧 Built With */}
        <div>
          <h3 className="text-lg font-bold mb-2">Built With</h3>
          <ul className="text-gray-400 space-y-1 text-sm">
            <li>Next.js + React</li>
            <li>TypeScript + Tailwind CSS</li>
            <li>Framer Motion</li>
            <li>Vercel Deployment</li>
          </ul>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-500 space-y-1">
        <p>&copy; {new Date().getFullYear()} Javier Romo. All rights reserved.</p>
        <p className="text-[10px]">
          Background image:{" "}
          <a
            href="https://www.freepik.com/free-photo/abstract-luxury-blur-dark-grey-black-gradient-used-as-background-studio-wall-display-your-products_18629173.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Diseñado por Freepik
          </a>
        </p>
      </div>
    </footer>
  );
}
