"use client";

import { useState } from "react";

export default function CartSummary({ subtotal }: { subtotal: number }) {
  const [shippingMethod, setShippingMethod] = useState<"free" | "express" | "pickup">("free");
  const shippingCost: Record<"free" | "express" | "pickup", number> = {
    free: 0.0,
    express: 15.0,
    pickup: subtotal * 0.21,
  };
  const total: number = subtotal + shippingCost[shippingMethod];

  return (
    <div
      className="w-2/5 self-start border border-neutral-7 rounded-md p-7
    sticky top-5"
    >
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
            className="flex justify-between items-center border border-neutral-7 rounded-[4px] px-4 py-3 cursor-pointer
              text-body2 font-body"
          >
            <div className="flex gap-3 items-center">
              <input
                type="radio"
                name="shipping"
                value={value}
                checked={shippingMethod === value}
                onChange={() => setShippingMethod(value)}
                className="w-[18px] h-[18px] appearance-none rounded-full 
                  shadow-[0_0_0_1px_black] border-4 border-white checked:bg-black
                  cursor-pointer"
              />
              {label}
            </div>
            <span>{cost}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-4 py-[13px] text-body2 font-body">
        <p>Subtotal</p>
        <p className="text-body2Semi font-body-semi">${subtotal.toFixed(2)}</p>
      </div>
      <hr />
      <div
        className="flex justify-between font-bold
        text-body1 font-body py-[13px]"
      >
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </div>

      <button className="bg-neutral-7 rounded-lg text-buttonM font-button text-white w-full py-3 mt-8">Checkout</button>
    </div>
  );
}
