"use client";

import { useEffect, useState } from "react";
import { IProduct } from "./ProductCard";
import { fetchProductById } from "./dataHandler";
import { StarRating } from "./utilities";
import ProductSlider from "./ProductSlider";

export default function ProductInfo({ id }: { id: number }) {
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      const fetchedProduct = await fetchProductById(id);
      if (fetchedProduct) {
        console.log(fetchedProduct);
        setProduct(fetchedProduct);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) return;

  return (
    <div className="flex flex-row gap-16">
      <div className="relative w-1/2 max-w-[547px]">
        <div className="absolute top-0 left-0 flex flex-col gap-2 p-8 z-10 outline-none">
          {product.is_new && <div className="bg-white px-[18px] py-2 rounded text-hairline1 font-hairline">NEW</div>}
          {product.sale_price && (
            <div className="bg-green text-white px-[18px] py-2 rounded text-hairline1 font-hairline">SALE</div>
          )}
        </div>
        <ProductSlider image={product.image} />
      </div>

      <div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center text-caption2 font-caption gap-3">
            <StarRating rating={5} />
            11 Reviews
          </div>
          <p className="text-headline4 font-headline">{product.name}</p>
          <p className="text-body2 font-body text-neutral-4">{product.description}</p>
          {product.sale_price ? (
            <div className="flex flex-row items-center gap-3">
              <p className="text-headline6 font-headline">${product.sale_price.toFixed(2)}</p>
              <p className="line-through text-headline7 font-headline text-neutral-4">${product.price.toFixed(2)}</p>
            </div>
          ) : (
            <p className="text-headline6 font-headline">${product.price.toFixed(2)}</p>
          )}
          <div>
            <div className="flex flex-row gap-1 text-body2Semi font-body-semi text-neutral-4">
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
          </div>

          {/* 구매란 */}
          <div></div>
        </div>
      </div>
    </div>
  );
}
