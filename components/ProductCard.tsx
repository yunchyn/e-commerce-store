import Link from "next/link";
import { StarRating } from "./utilities";

// not null : id, name, created_at, category, price, is_on_sale
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
  colors?: string; // ,로 split하니까 string으로 지정
}

export const ProductCard = ({ product_id, name, price, sale_price, image, is_new }: IProduct) => {
  return (
    <Link
      href={`/shop/${product_id}`}
      className="flex flex-col gap-1 text-neutral-7 "
    >
      <div className="w-[262px] h-[349px] bg-neutral-2 relative group">
        {/* hover시 장바구니 버튼 */}
        <div className="absolute w-full flex justify-center bottom-5">
          <div className="bg-neutral-7 w-4/5 py-2 rounded-lg text-buttonS font-button flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Add to cart
          </div>
        </div>
        {/* NEW, SALE */}
        <div className="absolute flex flex-col gap-2 p-4">
          {is_new && <div className="bg-white px-[14px] py-2 rounded text-hairline1 font-hairline">NEW</div>}
          {sale_price && (
            <div className="bg-green text-white px-[14px] py-2 rounded text-hairline1 font-hairline">SALE</div>
          )}
        </div>
        <img
          src={image}
          alt="proudct"
        />
      </div>

      {/* 별점 */}
      <div className="pt-3">
        <StarRating rating={5} />
      </div>

      <div className="font-body-semi text-body2Semi">{name}</div>
      <div className="font-caption text-caption1Semi">
        {sale_price ? (
          <div className="flex flex-row gap-3">
            <span>${sale_price.toFixed(2)}</span>
            <span className="line-through text-neutral-4">${price.toFixed(2)}</span>
          </div>
        ) : (
          <span>${price.toFixed(2)}</span>
        )}
      </div>
    </Link>
  );
};
