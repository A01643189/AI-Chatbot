import { GetServerSideProps } from "next";
import Stripe from "stripe";
import { useEffect } from "react";
import { useCartStore } from "@/pages/ecommerce/store/cartStore";
import Link from "next/link";


type SuccessProps = {
  amountTotal: number;
  currency: string;
};

export default function Success({ amountTotal, currency }: SuccessProps) {
  const formattedAmount = (amountTotal / 100).toFixed(2);

  useEffect(() => {
    useCartStore.getState().clearCart();
  }, []);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black text-black dark:text-white">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">✅ Thank you for your purchase!</h1>
        <p className="text-lg">
          You paid <span className="font-semibold">${formattedAmount} {currency.toUpperCase()}</span>
        </p>
        <Link href="/ecommerce">
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionId = context.query.session_id as string;

  if (!sessionId) {
    return {
      notFound: true,
    };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
  });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return {
      props: {
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
      },
    };
  } catch (err) {
    console.error("Error fetching session:", err);
    return {
      notFound: true,
    };
  }
};
