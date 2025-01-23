"use client";

import { useState } from "react";

export default function Cart() {
  const [shippingMethod, setShippingMethod] = useState<"free" | "express" | "pickup">("free");
  const subtotal: number = 1234.0;

  const shippingCost: Record<"free" | "express" | "pickup", number> = {
    free: 0.0,
    express: 15.0,
    pickup: subtotal * 0.21,
  };

  const total: number = subtotal + shippingCost[shippingMethod];

  return (
    <div className="flex flex-col items-center max-w-[1120px] mx-auto">
      <div className="text-headline3 font-headline">Cart</div>

      <div className="flex flex-row w-full">
        <div className="grid grid-cols-4 w-3/5 text-center border-b border-neutral-3 pb-2">
          <p>Product</p>
          <p>Quantity</p>
          <p>Price</p>
          <p>Subtotal</p>
        </div>

        <div className="w-2/5 border border-neutral-7 rounded-md p-7">
          <p className="text-headline7 font-headline mb-4">Cart summary</p>

          <div className="flex flex-col gap-3">
            {(
              [
                { value: "free", label: "Free shipping", cost: "$0.00" },
                { value: "express", label: "Express shipping", cost: "+$15.00" },
                { value: "pickup", label: "Pick Up", cost: "%21.00" },
              ] as const
            ).map(({ value, label, cost }) => (
              <label
                key={value}
                className="flex justify-between items-center border rounded-md px-4 py-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="shipping"
                  value={value}
                  checked={shippingMethod === value}
                  onChange={() => setShippingMethod(value)}
                  className="mr-2"
                />
                {label}
                <span>{cost}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>

          <button className="bg-neutral-7 rounded-lg text-buttonM font-button text-white w-full py-3 mt-4">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
