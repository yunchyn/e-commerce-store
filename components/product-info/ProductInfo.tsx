"use client";

import { useEffect, useState } from "react";
import { IProduct } from "../product-list/ProductCard";
import { fetchProductById } from "../dataHandler";
import { StarRating } from "../utilities";
import ProductSlider from "./ProductSlider";
import { AddToCart } from "../AddToCart";
import { ProductInfoSkeleton } from "../SkeletonComponents";
import WishListButton from "./WishListBtn";

export default function ProductInfo({ id: productId }: { id: number }) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      setLoading(true);
      const fetchedProduct = await fetchProductById(productId);
      if (fetchedProduct) {
        console.log(fetchedProduct);
        setProduct(fetchedProduct);
      }

      setLoading(false);
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return <ProductInfoSkeleton />;
  }

  if (!product) return;

  return (
    <div
      className="flex flex-row gap-16 pb-16 border-b border-neutral-3
    max-sm:flex-col max-sm:gap-4"
    >
      <div
        className="relative w-1/2 max-w-[547px]
      max-sm:w-full"
      >
        <div
          className="absolute top-0 left-0 flex flex-col gap-2 p-8 z-10 outline-none
        max-sm:p-6"
        >
          {product.is_new && <div className="bg-white px-[18px] py-2 rounded text-hairline1 font-hairline">NEW</div>}
          {product.sale_price && (
            <div className="bg-green text-white px-[18px] py-2 rounded text-hairline1 font-hairline">SALE</div>
          )}
        </div>
        <ProductSlider image={product.image} />
      </div>

      <div
        className="w-1/2 flex flex-col gap-4 relative
      max-sm:py-4 max-sm:w-full"
      >
        <div className="flex flex-row items-center text-caption2 font-caption gap-3">
          <StarRating rating={product.rating} />
        </div>
        <p className="text-headline4 font-headline">{product.name}</p>
        <p className="text-body2 font-body text-neutral-4">{product.description}</p>
        {product.sale_price ? (
          <div
            className="flex flex-row items-center gap-3 
          border-b border-neutral-3 pb-6"
          >
            <p className="text-headline6 font-headline">${product.sale_price.toFixed(2)}</p>
            <p className="line-through text-headline7 font-headline text-neutral-4">${product.price.toFixed(2)}</p>
          </div>
        ) : (
          <p
            className="text-headline6 font-headline
          border-b border-neutral-3 pb-6"
          >
            ${product.price.toFixed(2)}
          </p>
        )}

        {/* 컬러 */}
        <div>
          <div className="pt-2 flex flex-row gap-1 text-body2Semi font-body-semi text-neutral-4 pb-3">
            Choose Color
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 7L14 12L10 17"
                stroke="#6C7275"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex flex-row gap-3">
            {product.colors.map((colorOption) => (
              <div
                key={colorOption}
                className="flex items-center gap-1 text-body2 font-body"
              >
                <button
                  className={`w-4 h-4 rounded-full ${
                    color === colorOption ? "border-2 border-neutral-7" : "border border-neutral-4"
                  }`}
                  style={{ backgroundColor: colorOption }}
                  onClick={() => setColor(colorOption)}
                ></button>
              </div>
            ))}
          </div>
        </div>

        {/* 구매란 */}
        <div
          className="flex flex-col w-full gap-4 absolute bottom-2
        max-sm:relative max-sm:pt-12 max-sm:gap-3"
        >
          <div
            className="w-full flex flex-row gap-6
          max-sm:gap-3"
          >
            <div
              className="w-1/4 px-2 grid grid-cols-3 place-items-center bg-[#F5F5F5] rounded-lg
            max-sm:px-1"
            >
              <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.03656 10H15.7032"
                    stroke="#121212"
                    strokeWidth="0.9375"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.4688 4.16699C10.4688 3.90811 10.2589 3.69824 10 3.69824C9.74112 3.69824 9.53125 3.90811 9.53125 4.16699V9.5316H4.16656C3.90768 9.5316 3.69781 9.74147 3.69781 10.0004C3.69781 10.2592 3.90768 10.4691 4.16656 10.4691H9.53125V15.8337C9.53125 16.0925 9.74112 16.3024 10 16.3024C10.2589 16.3024 10.4688 16.0925 10.4688 15.8337V10.4691H15.8332C16.0921 10.4691 16.302 10.2592 16.302 10.0004C16.302 9.74147 16.0921 9.5316 15.8332 9.5316H10.4688V4.16699Z"
                    fill="#121212"
                  />
                </svg>
              </button>
            </div>

            <WishListButton id={productId} />
          </div>
          <button
            className="w-full flex justify-center items-center gap-2
             bg-neutral-7 text-white rounded-lg py-[10px] text-buttonM font-button
             max-sm:py-[6px] max-sm:text-buttonS max-sm:h-[41px]"
            onClick={(e) => {
              e.preventDefault();
              AddToCart(productId, quantity, color);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
