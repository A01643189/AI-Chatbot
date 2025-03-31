import { stripe } from "@/lib/stripe";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, description, price, image } = req.body;

    try {
      const product = await stripe.products.create({
        name,
        description,
        images: image ? [image] : [],
      });

      const priceObj = await stripe.prices.create({
        unit_amount: Math.round(price * 100),
        currency: "usd",
        product: product.id,
      });

      await stripe.products.update(product.id, {
        default_price: priceObj.id,
      });

      return res.status(200).json({ success: true, productId: product.id });
    } catch (err) {
      console.error("Stripe error:", err);
      return res.status(500).json({ error: "Unable to create product" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end("Method Not Allowed");
}
