import { GetServerSideProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { useState } from "react";
import { useRouter } from "next/router";
import EcommerceNavbar from "@/components/ecommerce/EcommerceNavbar";

type Props = {
  product: {
    id: string;
    name: string;
    description: string | null;
    image: string;
    price: number;
  };
};

export default function EditProduct({ product }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: product.name,
    description: product.description || "",
    image: product.image,
    price: (product.price / 100).toFixed(2),
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(product.image);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  

  const handleSubmit = async () => {
    let imageUrl = form.image;

    // Upload image if a new file was selected
    if (file) {
      const body = new FormData();
      body.append("file", file);
      body.append("purpose", "dispute_evidence"); // Stripe requires a purpose

      const base64Image = await toBase64(file);
      const uploadRes = await fetch("/api/admin/products/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });
      
      const data = await uploadRes.json();
      if (data?.url) {
        imageUrl = data.url;
      } else {
        alert("Image upload failed");
        return;
      }
      
    }

    // Update product
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image: imageUrl, price: parseFloat(form.price) }),
    });

    if (res.ok) {
      router.push("/ecommerce/admin/dashboard");
    } else {
      alert("Failed to update product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <EcommerceNavbar />
      <div className="max-w-xl mx-auto py-20 px-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />

        {/* File Upload */}
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
        {preview && <img src={preview} alt="Preview" className="h-32 rounded object-cover" />}

        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" />

        <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded hover:opacity-80">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description || "",
        image: product.images[0] || "",
        price: price.unit_amount || 0,
      },
    },
  };
};
