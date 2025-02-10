"use client";

import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchWishlistByMemberId, IWishProduct } from "../dataHandler";
import WishItem from "./WishItem";
import { WishItemSkeleton } from "../SkeletonComponents";

export default function WishList({ userId }: { userId: string }) {
  const router = useRouter();
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
    async function fetchSessionAndLoadWish() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        alert("Login is required.");
        router.push("/auth");
        return;
      }
      const userId = session.user.id;

      const fetchedProduct = await fetchWishlistByMemberId(userId);
      if (fetchedProduct) {
        console.log(fetchedProduct);
        setWishProducts(fetchedProduct);
      }
      setLoading(false);
    }

    fetchSessionAndLoadWish();
  }, [router]);

  return (
    <div className="px-[72px] w-3/4">
      <div className="flex flex-col">
        <div className="text-body1Semi font-[32px] pb-10">Your Wishlist</div>
        {/* 리스트 */}
        <div
          className="grid grid-cols-3 text-neutral-4 text-caption1 font-caption w-full text-center
        border-b border-neutral-3 pb-2"
        >
          <p className="text-left">Product</p>
          <p>Price</p>
          <p>Action</p>
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
    </div>
  );
}
