import EcommerceNavbar from "@/components/EcommerceNavbar";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
            <EcommerceNavbar/>

            {/* Hero Section */}
            <section className="w-full py-20 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Elevate Your Style</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Discover modern clothing crafted for bold identities.
                </p>
                <Link href="/shop">
                    <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-md font-semibold hover:opacity-80 transition">
                        Shop Now
                    </button>
                </Link>
            </section>

            {/* Featured Products Preview */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-semibold mb-6 text-center">Featured Pieces</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Placeholder cards – later replaced with actual product data */}
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="border rounded-md p-4 bg-white dark:bg-[#1e1e1e] shadow hover:shadow-lg transition">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                            <h3 className="text-lg font-medium">Product Name</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">$49.99</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
