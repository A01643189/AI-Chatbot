import { useEffect, useState } from "react";
import EcommerceNavbar from "@/components/ecommerce/EcommerceNavbar";
import Footer from "@/components/ecommerce/EcommerceFooter";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  active: boolean;
};

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      const activeProducts = data.filter((product: Product) => product.active);
      setProducts(activeProducts);
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <EcommerceNavbar />

      <section className="max-w-6xl mx-auto px-4 py-28">
        <h2 className="text-3xl font-bold mb-6 text-center">Shop All</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/ecommerce/product/${product.id}`}>
              <div className="cursor-pointer border rounded-md p-4 bg-white dark:bg-[#1e1e1e] shadow hover:shadow-lg transition">
                <div className="h-48 rounded mb-4 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm text-gray-500">No Image</div>
                  )}
                </div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  ${(product.price / 100).toFixed(2)} {product.currency.toUpperCase()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
