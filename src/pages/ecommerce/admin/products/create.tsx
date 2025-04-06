import { useState } from "react";
import { useRouter } from "next/router";
import EcommerceNavbar from "@/components/ecommerce/EcommerceNavbar";

export default function CreateProduct() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

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

  const handleSubmit = async () => {
    let imageUrl = form.image;
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        // 🔁 Corrected API route for Cloudinary upload
        const res = await fetch("/api/admin/products/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result }),
        });
  
        const data = await res.json();
        imageUrl = data.url;
  
        await fetch("/api/admin/products/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            image: imageUrl,
            price: parseFloat(form.price),
          }),
        });
  
        router.push("/ecommerce/admin/dashboard");
      };
      reader.readAsDataURL(file);
    } else {
      await fetch("/api/admin/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
        }),
      });
      router.push("/ecommerce/admin/dashboard");
    }
  };  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <EcommerceNavbar />
      <div className="max-w-xl mx-auto py-20 px-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Create Product</h1>

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
        {preview && <img src={preview} className="h-32 rounded object-cover" />}
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" />

        <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded hover:opacity-80">
          Create Product
        </button>
      </div>
    </div>
  );
}
