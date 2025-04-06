import EcommerceNavbar from "@/components/ecommerce/EcommerceNavbar";
import Footer from "@/components/ecommerce/EcommerceFooter";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <EcommerceNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="w-full h-screen bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('/hero.png')",
          }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg">
            New Know Wear
          </h1>
        </section>

        {/* Collection Preview */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <div
            className="h-[500px] bg-cover bg-center flex items-end justify-center"
            style={{ backgroundImage: "url('/men.png')" }}
          >
            <Link href="/ecommerce/shop">
              <button className="mb-10 bg-white text-black px-6 py-2 font-bold text-lg shadow hover:opacity-90">
                SHOP MEN
              </button>
            </Link>
          </div>
          <div
            className="h-[500px] bg-cover bg-center flex items-end justify-center"
            style={{ backgroundImage: "url('/woman.png')" }}
          >
            <Link href="/ecommerce/shop">
              <button className="mb-10 bg-white text-black px-6 py-2 font-bold text-lg shadow hover:opacity-90">
                SHOP WOMEN
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
