import { stripe } from "@/lib/stripe";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id } = req.body;

    try {
      await stripe.products.update(id, { active: true });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Restore product error:", err);
      return res.status(500).json({ error: "Unable to restore product" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end("Method Not Allowed");
}
