"use client";

import Link from "next/link";
import { ICartProduct } from "../dataHandler";
import { useState } from "react";
import { supabase } from "@/supabase";

export default function CartItem({
  product,
  handleRemove,
  onQuantityChange,
}: {
  product: ICartProduct;
  handleRemove: (cartId: number) => void;
  onQuantityChange: (cartId: number, newQuantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(product.quantity);

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity > 10) {
      alert("You can add up to 10 units per product.");
      return;
    }

    setQuantity(newQuantity);
    onQuantityChange(product.cart_id, newQuantity);

    const { error } = await supabase.from("cart").update({ quantity: newQuantity }).eq("cart_id", product.cart_id);

    if (error) {
      console.error("Failed to update quantity:", error.message);
    }
  };

  return (
    <div
      className="grid grid-cols-[2fr_1fr_1fr_1fr] text-center border-b border-neutral-3 py-6 
    items-center"
    >
      <Link
        href={`/shop/${product.product_id}`}
        className="flex flex-row gap-4"
      >
        <img
          src={product.image}
          alt="Product Image"
          className="max-w-20"
        />
        <div className="text-left flex flex-col gap-2 justify-center">
          <p className="text-caption1Semi font-caption-semi">{product.name}</p>
          <p className="text-caption2 font-caption text-neutral-4">Color: {product.color}</p>
          <div
            className="text-caption1Semi font-caption-semi text-neutral-4 flex flex-row gap-2 items-center cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (window.confirm("Are you sure you want to remove this item?")) {
                handleRemove(product.cart_id);
              }
            }}
          >
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.292893 0.792893C0.683417 0.402369 1.31658 0.402369 1.70711 0.792893L7 6.08579L12.2929 0.792893C12.6834 0.402369 13.3166 0.402369 13.7071 0.792893C14.0976 1.18342 14.0976 1.81658 13.7071 2.20711L8.41421 7.5L13.7071 12.7929C14.0976 13.1834 14.0976 13.8166 13.7071 14.2071C13.3166 14.5976 12.6834 14.5976 12.2929 14.2071L7 8.91421L1.70711 14.2071C1.31658 14.5976 0.683418 14.5976 0.292893 14.2071C-0.0976309 13.8166 -0.0976309 13.1834 0.292893 12.7929L5.58579 7.5L0.292893 2.20711C-0.0976311 1.81658 -0.0976311 1.18342 0.292893 0.792893Z"
                fill="#6C7275"
              />
            </svg>
            Remove
          </div>
        </div>
      </Link>
      <div
        className="w-[80px] px-2 py-1 grid grid-cols-3 place-items-center 
      bg-white rounded border border-neutral-7
      text-[12px] font-body-semi
      mx-auto"
      >
        <button onClick={() => updateQuantity(Math.max(1, quantity - 1))}>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.22925 8.5H12.5626"
              stroke="#121212"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {quantity}
        <button onClick={() => updateQuantity(quantity + 1)}>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.375 3.83398C8.375 3.62688 8.20711 3.45898 8 3.45898C7.79289 3.45898 7.625 3.62688 7.625 3.83398V8.12567H3.33325C3.12615 8.12567 2.95825 8.29356 2.95825 8.50067C2.95825 8.70778 3.12615 8.87567 3.33325 8.87567H7.625V13.1673C7.625 13.3744 7.79289 13.5423 8 13.5423C8.20711 13.5423 8.375 13.3744 8.375 13.1673V8.87567H12.6666C12.8737 8.87567 13.0416 8.70778 13.0416 8.50067C13.0416 8.29356 12.8737 8.12567 12.6666 8.12567H8.375V3.83398Z"
              fill="#121212"
            />
          </svg>
        </button>
      </div>

      <p className="font-caption text-[18px]">${product.sale_price ?? product.price}</p>
      <p className="font-caption-semi text-[18px]">
        ${(product.quantity * (product.sale_price ?? product.price)).toFixed(2)}
      </p>
    </div>
  );
}
