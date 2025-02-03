import Link from "next/link";
import { StarRating } from "./utilities";
import { useSearchParams } from "next/navigation";
import { AddToCart } from "./AddToCart";

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
  const category = useSearchParams().get("category") || "all rooms";

  // const addToCart = async () => {
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();

  //   if (!session) {
  //     alert("Login is required.");
  //     return;
  //   }

  //   const userId = session.user.id;

  //   // product 테이블에서 colors 가져오기
  //   const { data: product, error: productError } = await supabase
  //     .from("product")
  //     .select("colors")
  //     .eq("product_id", product_id)
  //     .maybeSingle();

  //   if (productError || !product) {
  //     console.error("Failed to fetch product:", productError);
  //     alert("Failed to fetch product details.");
  //     return;
  //   }

  //   const color = product.colors?.[0] || null; // 컬러가 있으면 첫 번째 색상, 없으면 null

  //   // 현재 장바구니에 같은 product_id & color가 존재하는지 확인
  //   const { data: existingCartItem, error: fetchError } = await supabase
  //     .from("cart")
  //     .select("quantity")
  //     .eq("member_id", userId)
  //     .eq("product_id", product_id)
  //     .eq("color", color)
  //     .maybeSingle();

  //   if (fetchError) {
  //     console.error("Failed to check the cart:", fetchError);
  //     alert("Failed to check the cart.");
  //     return;
  //   }

  //   if (existingCartItem) {
  //     // 같은 color + product_id가 있으면 quantity 증가
  //     const { error: updateError } = await supabase
  //       .from("cart")
  //       .update({ quantity: existingCartItem.quantity + 1 })
  //       .eq("member_id", userId)
  //       .eq("product_id", product_id)
  //       .eq("color", color);

  //     if (updateError) {
  //       console.error("Failed to update the cart:", updateError);
  //       alert("Failed to update the cart.");
  //     } else {
  //       alert("Quantity increased in the cart.");
  //     }
  //   } else {
  //     // 존재하지 않으면 새로운 튜플 추가
  //     const insertData: any = {
  //       member_id: userId,
  //       product_id,
  //       quantity: 1,
  //     };

  //     if (color) {
  //       insertData.color = color;
  //     }

  //     const { error: insertError } = await supabase.from("cart").insert(insertData);

  //     if (insertError) {
  //       console.error("Failed to add to the cart:", insertError);
  //       alert("Failed to add to the cart.");
  //     } else {
  //       alert("Added to the cart.");
  //     }
  //   }
  // };

  return (
    <Link
      href={`/shop/${product_id}?category=${category}`}
      className="flex flex-col gap-1 text-neutral-7 "
    >
      <div
        className="w-[262px] h-[349px] bg-neutral-2 relative group
      max-sm:w-[231px] max-sm:h-[307px]"
      >
        {/* hover시 장바구니 버튼 */}
        <div
          className="absolute w-full flex justify-center bottom-5
        max-sm:bottom-4"
        >
          <button
            className="bg-neutral-7 w-4/5 py-2 rounded-lg text-buttonS font-button flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300
            max-sm:w-10/12"
            onClick={(e) => {
              e.preventDefault();
              AddToCart(product_id, 1);
            }}
          >
            Add to cart
          </button>
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
        <StarRating rating={rating} />
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
