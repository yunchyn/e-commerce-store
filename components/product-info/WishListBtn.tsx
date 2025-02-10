"use client";

import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import { AddToWishlist } from "../AddToWishList";
import { isProductInWishlist } from "../dataHandler";

export default function WishListButton({ id: productId }: { id: number }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("session: ", user);
      if (user) {
        setUserId(user.id);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const checkWishlist = async () => {
      const exists = await isProductInWishlist(userId, productId);
      console.log("Wishlist status: ", exists);
      setIsInWishlist(exists);
    };

    checkWishlist();
  }, [userId, productId]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("Please log in to add items to the wishlist.");
      return;
    }

    await AddToWishlist(productId); // Add product to wishlist
    setIsInWishlist(true); // Update state immediately after adding to wishlist
  };

  return (
    <button
      className="w-3/4 flex flex-row justify-center items-center gap-2
  py-[10px] border border-neutral-7 rounded-lg
  max-sm:py-[6px] max-sm:text-buttonS max-sm:h-[41px]"
      onClick={handleClick}
    >
      {isInWishlist ? (
        <svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0002 2.18159C9.02692 1.24762 7.70557 0.673615 6.25016 0.673615C3.25862 0.673615 0.833496 3.09874 0.833496 6.09028C0.833496 11.3972 6.64211 14.3278 9.01165 15.3025C9.6498 15.565 10.3505 15.565 10.9887 15.3025C13.3582 14.3278 19.1668 11.3972 19.1668 6.09028C19.1668 3.09874 16.7417 0.673615 13.7502 0.673615C12.2948 0.673615 10.9734 1.24762 10.0002 2.18159Z"
            fill="#141718"
          />
        </svg>
      ) : (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.1924 6.91706C12.8055 7.28838 12.1945 7.28838 11.8076 6.91706L11.1152 6.2526C10.3048 5.47487 9.20994 5 8 5C5.51472 5 3.5 7.01472 3.5 9.5C3.5 11.8826 4.78979 13.8501 6.65176 15.4666C8.51532 17.0844 10.7434 18.1574 12.0746 18.7051C12.353 18.8196 12.647 18.8196 12.9254 18.7051C14.2566 18.1574 16.4847 17.0844 18.3482 15.4666C20.2102 13.85 21.5 11.8826 21.5 9.5C21.5 7.01472 19.4853 5 17 5C15.7901 5 14.6952 5.47487 13.8848 6.2526L13.1924 6.91706ZM12.5 4.80957C11.3321 3.6888 9.74649 3 8 3C4.41015 3 1.5 5.91015 1.5 9.5C1.5 15.8683 8.47034 19.385 11.3138 20.5547C12.0796 20.8697 12.9204 20.8697 13.6862 20.5547C16.5297 19.385 23.5 15.8682 23.5 9.5C23.5 5.91015 20.5899 3 17 3C15.2535 3 13.6679 3.6888 12.5 4.80957Z"
            fill="#141718"
          />
        </svg>
      )}
      Wishlist
    </button>
  );
}
