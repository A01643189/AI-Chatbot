  import { NextApiRequest, NextApiResponse } from 'next';
  import Stripe from 'stripe';

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key is not defined');
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const { items } = req.body;

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: items.map((item: { name: any; price: any; quantity: any; }) => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
              },
              unit_amount: item.price*100,
            },
            quantity: item.quantity,
          })),
          mode: 'payment',
          success_url: `${req.headers.origin}/ecommerce/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/ecommerce/cancel`,
        });

        res.status(200).json({ sessionId: session.id });
      } catch (err) {
        res.status(500).json({ error: 'Something went wrong.' });
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  }
