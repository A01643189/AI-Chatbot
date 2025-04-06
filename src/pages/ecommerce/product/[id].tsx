import { GetServerSideProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import EcommerceNavbar from "@/components/ecommerce/EcommerceNavbar";
import { useCartStore } from '@/store/cartStore';

type ProductPageProps = {
  product: {
    id: string;
    name: string;
    description?: string;
    image?: string;
    price: number;
    currency: string;
  };
};

export default function ProductPage({ product }: ProductPageProps) {
    const addItem = useCartStore((state) => state.addItem);
  
    const handleAddToCart = () => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    };  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <EcommerceNavbar />

      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/2">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg w-full object-cover shadow"
            />
          ) : (
            <div className="bg-gray-200 dark:bg-gray-700 h-64 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
            ${product.price.toFixed(2)} {product.currency.toUpperCase()}
          </p>
          {product.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>
          )}

          <button onClick={handleAddToCart} className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-md font-semibold hover:opacity-80 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
  
    try {
      const product = await stripe.products.retrieve(id, {
        expand: ["default_price"],
      });
  
      const price = product.default_price as Stripe.Price;
  
      return {
        props: {
          product: {
            id: product.id,
            name: product.name,
            description: product.description,
            image: product.images[0] || null,
            price: (price.unit_amount || 0) / 100,
            currency: price.currency,
          },
        },
      };
    } catch (error) {
      console.error("Product page error:", error);
      return {
        notFound: true,
      };
    }
  };
  
