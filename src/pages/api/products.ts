import { stripe } from "@/lib/stripe";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });

    const formatted = products.data.map((product) => {
      const price = product.default_price as Stripe.Price;

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0],
        price: price.unit_amount,
        currency: price.currency,
      };
    });

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Unable to fetch products" });
  }
}
