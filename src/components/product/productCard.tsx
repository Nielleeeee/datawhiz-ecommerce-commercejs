"use client";

import { MouseEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@chec/commerce.js/types/product";
import { useCart } from "@/lib/cartContext";
import { toast } from "react-toastify";

export default function ProductCard(product: Product) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCartClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    try {
      setLoading(true);

      const response = addToCart(product.id, 1);

      await toast
        .promise(response, {
          pending: "Adding to Cart... 🙄",
          success: "Item Added to Cart. 👌",
          error: "Something went wrong. 😱",
        })
        .then(() => setLoading(false));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link
      href={`/shop/${product.permalink}`}
      className="group relative block overflow-hidden rounded-lg"
    >
      <Image
        src={product.image?.url ?? ""}
        alt="some image"
        className="h-64 w-full object-cover transition duration-500 scale-[1.2] group-hover:scale-100 sm:h-72"
        width={500}
        height={500}
      />

      <div className="relative border border-gray-100 bg-white p-6">
        {/* <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
          {" "}
          New{" "}
        </span> */}

        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {product.name}
        </h3>

        <p className="mt-1.5 text-sm text-gray-700">
          {product.price.formatted_with_symbol}
        </p>

        <form className="mt-4">
          <button
            onClick={handleAddToCartClick}
            disabled={loading}
            className="block w-full rounded bg-blue-500 disabled:bg-gray-500 text-white p-4 text-sm font-medium transition hover:scale-105"
          >
            Add to Cart
          </button>
        </form>
      </div>
    </Link>
  );
}

// WishList button
{
  /* <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button> */
}
