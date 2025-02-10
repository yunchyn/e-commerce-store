"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { fetchCartByMemberId, ICartProduct } from "../dataHandler";
import { supabase } from "@/supabase";
import CartSummary from "./CartSummary";
import CartItem from "./CartItem";
import { CartItemSkeleton } from "../SkeletonComponents";
import { SessionContext } from "../SessionProvider";

export default function CartList() {
  const router = useRouter();
  const userSession = useContext(SessionContext);
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const handleQuantityChange = (cartId: number, newQuantity: number) => {
    setCartProducts((prev) =>
      prev.map((product) => (product.cart_id === cartId ? { ...product, quantity: newQuantity } : product))
    );
  };

  useEffect(() => {
    if (userSession && !userSession.userId) {
      alert("Login is required.");
      router.push("/auth");
      return;
    }

    async function loadCart() {
      const fetchedProduct = await fetchCartByMemberId(userSession!.userId);
      if (fetchedProduct) {
        console.log(fetchedProduct);
        setCartProducts(fetchedProduct);
      }
      setLoading(false);
    }

    loadCart();
  }, [router, userSession]);

  const subtotal = cartProducts.reduce((total, product) => {
    const price = product.sale_price ?? product.price;
    return total + price * product.quantity;
  }, 0);

  const handleRemove = async (cartId: number) => {
    const { error } = await supabase.from("cart").delete().match({ cart_id: cartId });

    if (error) {
      console.error("Failed to remove product:", error);
      return;
    }

    setCartProducts((prev) => prev.filter((product) => product.cart_id !== cartId));
  };

  return (
    <>
      <div className="flex flex-col w-3/5">
        <div
          className="grid grid-cols-[2fr_1fr_1fr_1fr] text-center border-b border-neutral-7 pb-6
      text-body2Semi font-body-semi"
        >
          <p className="text-left">Product</p>
          <p>Quantity</p>
          <p>Price</p>
          <p>Subtotal</p>
        </div>

        {loading ? (
          Array.from({ length: 3 }).map((_, index) => <CartItemSkeleton key={index} />)
        ) : cartProducts.length === 0 ? (
          <div className="text-center py-48 text-body2 font-body text-neutral-4">Your cart is empty.</div>
        ) : (
          cartProducts.map((product) => (
            <CartItem
              key={product.cart_id}
              product={product}
              handleRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
          ))
        )}
      </div>

      <CartSummary subtotal={subtotal} />
    </>
  );
}
