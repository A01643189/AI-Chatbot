import { useCartStore } from '@/store/cartStore';
import { loadStripe } from '@stripe/stripe-js';
import EcommerceNavbar from '@/components/ecommerce/EcommerceNavbar';
import Link from "next/link";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CartPage = () => {
  const { items, removeItem, clearCart } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    if (stripe && data.sessionId) {
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      alert("Failed to create checkout session.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <EcommerceNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {items.length === 0 ? (
          <>
            <p>Your cart is empty.</p>
            <Link href="/ecommerce">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Continue Shopping
              </button>
            </Link>
          </>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="border p-4 rounded-md bg-white dark:bg-[#1e1e1e] shadow">
                <p className="font-medium">{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${(item.price).toFixed(2)}</p>
                <button onClick={() => removeItem(item.id)} className="text-red-500 mt-2">Remove</button>
              </div>
            ))}
            <h2 className="text-xl font-semibold">Total: ${(total).toFixed(2)}</h2>
            <div className="flex gap-4">
              <button onClick={clearCart} className="bg-gray-500 text-white px-4 py-2 rounded-md">Clear Cart</button>
              <button onClick={handleCheckout} className="bg-black text-white px-4 py-2 rounded-md">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
