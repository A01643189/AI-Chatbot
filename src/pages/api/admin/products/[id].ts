import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { id } = req.query;
  const { name, description, image, price } = req.body;

  try {
    // Update the product details (except price)
    await stripe.products.update(id as string, {
      name,
      description,
      images: [image],
    });

    // ✅ Create a new price object (prices are immutable)
    const newPrice = await stripe.prices.create({
      product: id as string,
      unit_amount: Math.round(price * 100),
      currency: "usd",
    });

    // Optionally set the new price as the default
    await stripe.products.update(id as string, {
      default_price: newPrice.id,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Stripe update error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
}
