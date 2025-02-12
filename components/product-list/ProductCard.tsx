import Link from "next/link";
import { StarRating } from "../utilities";
import { useSearchParams } from "next/navigation";
import { AddToCart } from "../AddToCart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

export type Category = "all rooms" | "living room" | "bedroom" | "kitchen" | "bathroom";

export interface IProduct {
  product_id: number;
  name: string;
  created_at: Date;
  category_id: number;
  price: number;
  is_new: boolean;
  sale_price?: number;
  image: string;
  description?: string;
  colors: string[];
  rating?: number;
}

export const ProductCard = ({ product_id, name, price, sale_price, image, is_new, rating }: IProduct) => {
  const userSession = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();
  const category = useSearchParams().get("category") || "all rooms";

  return (
    <Link
      href={`/shop/${product_id}?category=${category}`}
      className="flex flex-col gap-1 text-neutral-7"
    >
      <div
        className="max-w-[262px] max-h-[349px] bg-neutral-2 relative group
      max-sm:max-w-[231px] max-sm:max-h-[307px]"
      >
        {/* hover시 장바구니 버튼 */}
        <div
          className="absolute w-full flex justify-center bottom-5
        max-sm:bottom-3"
        >
          <button
            className="bg-neutral-7 w-4/5 py-2 rounded-lg text-buttonS font-button flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300
            max-sm:w-10/12 max-sm:text-buttonXS max-sm:rounded max-sm:py-[6px]"
            onClick={(e) => {
              e.preventDefault();
              AddToCart(product_id, 1, userSession, dispatch);
            }}
          >
            Add to cart
          </button>
        </div>
        {/* NEW, SALE */}
        <div
          className="absolute flex flex-col gap-2 p-4
        max-sm:p-3"
        >
          {is_new && (
            <div
              className="bg-white px-[14px] py-2 rounded text-hairline1 font-hairline
          max-sm:py-[6px]"
            >
              NEW
            </div>
          )}
          {sale_price && (
            <div
              className="bg-green text-white px-[14px] py-2 rounded text-hairline1 font-hairline
            max-sm:py-[6px]"
            >
              SALE
            </div>
          )}
        </div>
        <img
          src={image}
          alt="proudct"
        />
      </div>

      {/* 별점 */}
      <div className="pt-3">
        <StarRating rating={rating} />
      </div>

      <div
        className="font-body-semi text-body2Semi
      max-sm:text-caption1Semi max-sm:font-caption-semi"
      >
        {name}
      </div>
      <div
        className="font-caption-semi text-caption1Semi
      max-sm:text-caption2Semi"
      >
        {sale_price ? (
          <div className="flex flex-row gap-3">
            <span>${sale_price.toFixed(2)}</span>
            <span className="line-through text-neutral-4 font-caption">${price.toFixed(2)}</span>
          </div>
        ) : (
          <span>${price.toFixed(2)}</span>
        )}
      </div>
    </Link>
  );
};
