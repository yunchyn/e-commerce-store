"use client";

import { useEffect, useState } from "react";
import ProductCarousel from "./product-list/ProductCarousel";
import { IProduct } from "./product-list/ProductCard";
import { fetchNewProducts } from "@/components/dataHandler";
import Link from "next/link";

export default function NewArrivals() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchNewProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  if (!products || products.length === 0) {
    return <></>;
  }

  return (
    <div
      className="relative pt-12
    max-sm:pt-8"
    >
      <div
        className="text-headline4
      max-sm:text-headline5"
      >
        <p>New</p> <p>Arrivals</p>
      </div>

      <Link
        href="/sale"
        className="flex"
      >
        <span
          className="absolute right-0 top-[107px] flex flex-row items-center gap-1 text-buttonS font-button border-b border-neutral-7
        max-sm:text-buttonXS max-sm:top-[83px]"
        >
          More Products
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.16666 10H15.8333"
              stroke="#141718"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.8333 15L15.8333 10"
              stroke="#141718"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.8333 5L15.8333 10"
              stroke="#141718"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>

      <div
        className="pt-12
      max-sm:pt-10"
      >
        <ProductCarousel products={products} />
      </div>
    </div>
  );
}
