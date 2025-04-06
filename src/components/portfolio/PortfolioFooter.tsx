import Link from "next/link";

export default function PortfolioFooter() {
  return (
    <footer className="w-full px-6 py-12 bg-black text-white mt-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        {/* 🌟 Your Info */}
        <div>
          <h3 className="text-lg font-bold mb-2">Javier Romo</h3>
          <p>Creating beautiful and functional web experiences.</p>
        </div>

        {/* 📁 Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Links</h3>
          <ul className="space-y-1">
            <li><Link href="/ecommerce" className="hover:underline">Ecommerce</Link></li>
            <li><Link href="/ai" className="hover:underline">AI Components</Link></li>
            <li><Link href="/#contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* 📸 Credits */}
        <div>
          <h3 className="text-lg font-bold mb-2">Credits</h3>
          <p>
            Background image by{" "}
            <a
              href="https://www.freepik.com/free-photo/abstract-luxury-blur-dark-grey-black-gradient-used-as-background-studio-wall-display-your-products_18629173.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300"
            >
              benzoix on Freepik
            </a>
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-10">
        &copy; {new Date().getFullYear()} Javier Romo. All rights reserved.
      </div>
    </footer>
  );
}
