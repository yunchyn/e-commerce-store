"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCartByMemberId, getCartCount, ICartProduct } from "../dataHandler";
import { supabase } from "@/supabase";
import CartSummary from "./CartSummary";
import CartItem from "./CartItem";
import { CartItemSkeleton } from "../SkeletonComponents";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSession } from "@/store/sessionSlice";

export default function CartList() {
  const router = useRouter();
  const userSession = useSelector((state: RootState) => state.session);
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleQuantityChange = (cartId: number, newQuantity: number) => {
    setCartProducts((prev) =>
      prev.map((product) => (product.cart_id === cartId ? { ...product, quantity: newQuantity } : product))
    );
  };

  useEffect(() => {
    if (!userSession) return; // userSession이 undefined이면 실행 X

    if (!userSession.userId) {
      alert("Login is required.");
      router.push("/auth");
      return;
    }

    async function loadCart() {
      setLoading(true);
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

    // Redux 세션의 cartCount 업데이트
    const newCartCount = await getCartCount(userSession.userId);
    dispatch(setSession({ ...userSession, cartCount: newCartCount }));
  };

  return (
    <div
      className="w-full flex flex-row gap-16 
    max-sm:flex-col max-sm:gap-10"
    >
      <div
        className="flex flex-col w-3/5
      max-sm:w-full"
      >
        <div
          className="grid grid-cols-[2fr_1fr_1fr_1fr] text-center border-b border-neutral-7 pb-6
      text-body2Semi font-body-semi
      max-sm:grid-cols-[2fr_1fr]"
        >
          <p className="text-left">Product</p>
          <p className="max-sm:hidden">Quantity</p>
          <p className="max-sm:hidden">Price</p>
          <p className="max-sm:hidden">Subtotal</p>
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
    </div>
  );
}
