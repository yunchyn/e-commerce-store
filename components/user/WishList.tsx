"use client";

import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import { fetchWishlistByMemberId, IWishProduct } from "../dataHandler";
import WishItem from "./WishItem";
import { WishItemSkeleton } from "../SkeletonComponents";

export default function WishList({ userId }: { userId: string }) {
  const [wishProducts, setWishProducts] = useState<IWishProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRemove = async (wishlistId: number) => {
    const { error } = await supabase.from("wishlist").delete().match({ wishlist_id: wishlistId });

    if (error) {
      console.error("Failed to remove product:", error);
      return;
    }

    setWishProducts((prev) => prev.filter((product) => product.wishlist_id !== wishlistId));
  };

  useEffect(() => {
    async function loadWishlist() {
      const fetchedProduct = await fetchWishlistByMemberId(userId);
      if (fetchedProduct) {
        console.log(fetchedProduct);
        setWishProducts(fetchedProduct);
      }
      setLoading(false);
    }

    loadWishlist();
  }, [userId]);

  return (
    <div className="flex flex-col">
      <div className="text-body1Semi font-[32px] pb-10">Your Wishlist</div>
      {/* 리스트 */}
      <div
        className="grid grid-cols-3 text-neutral-4 text-caption1 font-caption w-full text-center
        border-b border-neutral-3 pb-2"
      >
        <p className="text-left">Product</p>
        <p className="max-sm:hidden">Price</p>
        <p className="max-sm:hidden">Action</p>
      </div>
      <div>
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => <WishItemSkeleton key={index} />)
        ) : wishProducts.length === 0 ? (
          <div className="text-center py-48 text-body2 font-body text-neutral-4">Your wishlist is empty.</div>
        ) : (
          wishProducts.map((product) => (
            <WishItem
              key={product.wishlist_id}
              product={product}
              handleRemove={handleRemove}
            />
          ))
        )}
      </div>
    </div>
  );
}
