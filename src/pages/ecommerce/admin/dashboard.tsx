import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import EcommerceNavbar from "@/components/EcommerceNavbar";

type Product = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  currency: string;
  active: boolean;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    if (status === "unauthenticated") router.push("/ecommerce");
  }, [status]);

  useEffect(() => {
    if (isAdmin) {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Failed to fetch products", err));
    }
  }, [isAdmin]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
  
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });    
  
    if (res.ok) {
      setProducts(products.filter(p => p.id !== id));
    } else {
      alert("Failed to delete product");
    }
  };

  const handleRestore = async (id: string) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: true }),
    });
  
    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, active: true } : p))
      );
    } else {
      alert("Failed to restore product");
    }
  };
  
  if (status === "loading") return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <EcommerceNavbar />
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {isAdmin ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Manage Products</h2>
              <button
                onClick={() => router.push("/ecommerce/admin/products/create")}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                + New Product
              </button>
            </div>

            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-100 dark:hover:bg-[#1e1e1e]">
                    <td className="p-2 border">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="p-2 border">{product.name}</td>
                    <td className="p-2 border">
                      ${(product.price / 100).toFixed(2)} {product.currency.toUpperCase()}
                    </td>
                      <td className="p-2 border">
                        {product.active ? (
                          <>
                            <button
                              onClick={() => router.push(`/ecommerce/admin/products/${product.id}`)}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="ml-4 text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleRestore(product.id)}
                            className="text-green-600 hover:underline"
                          >
                            Restore
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>You are not authorized to view this page.</p>
        )}
      </div>
    </div>
  );
}
