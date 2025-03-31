import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "POST") {
    const { name, description, image, price } = req.body;

    try {
      await stripe.products.update(id as string, {
        name,
        description,
        images: [image],
      });

      const newPrice = await stripe.prices.create({
        product: id as string,
        unit_amount: Math.round(price * 100),
        currency: "usd",
      });

      await stripe.products.update(id as string, {
        default_price: newPrice.id,
      });

      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Stripe update error:", err);
      res.status(500).json({ error: "Failed to update product" });
    }
  }

  else if (req.method === "DELETE") {
    try {
      await stripe.products.update(id as string, { active: false });
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Stripe delete error:", err);
      res.status(500).json({ error: "Failed to delete product" });
    }
  }

  else if (req.method === "PUT") {
    const { active } = req.body;
  
    try {
      await stripe.products.update(id as string, { active });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Restore product error:", err);
      return res.status(500).json({ error: "Unable to restore product" });
    }
  }  

  else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end("Method Not Allowed");
  }
}
