import Navbar from "@/components/ui/Navbar";
import Link from "next/link";

export default function PortfolioHome() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      <Navbar />

      <main className="pt-24 px-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-center text-black dark:text-white">
          Welcome to My Portfolio
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <Link href="/ecommerce" passHref>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-xl bg-white dark:bg-[#1e1e1e] transition cursor-pointer">
              <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">🛍️ Ecommerce</h2>
              <p className="text-gray-600 dark:text-gray-400">
                A fully functional clothing store built with Stripe and modern APIs.
              </p>
            </div>
          </Link>

          <Link href="/ai" passHref>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-xl bg-white dark:bg-[#1e1e1e] transition cursor-pointer">
              <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">🤖 AI Components</h2>
              <p className="text-gray-600 dark:text-gray-400">
                A collection of AI-powered UI tools like chatbots and form assistants.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
