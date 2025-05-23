"use client";

import { ReactNode, useEffect, useState } from "react";
import { Category, IProduct, ProductCard } from "./ProductCard";
import { fetchAllProducts, fetchProductsByCategory } from "@/components/dataHandler";
import { useSearchParams } from "next/navigation";
import { toUppercaseFirstLetters } from "../utilities";
import { ProductCardSkeleton } from "../SkeletonComponents";

export default function ProductList() {
  const searchParams = useSearchParams();
  const priceRange = searchParams.get("priceRange") || "";
  const categories: { id: number; name: Category }[] = [
    { id: 1, name: "living room" },
    { id: 2, name: "bedroom" },
    { id: 3, name: "kitchen" },
    { id: 4, name: "bathroom" },
  ];
  const categoryId = categories.find((cat) => cat.name === (searchParams.get("category") || "all rooms"))?.id || 0;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("Sort by");
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = ["Default", "Low-price", "High-price", "High-rating"];

  const ViewOption = ({ children }: { children: ReactNode }) => (
    <div
      className="flex justify-center items-center w-[46px] h-[40px] bg-white border border-[#EAEAEA]
        transition-colors duration-300 hover:bg-neutral-3
        cursor-pointer group"
    >
      {children}
    </div>
  );

  useEffect(() => {
    setIsLoading(true);
    const loadProducts = async () => {
      let fetchedProducts = categoryId === 0 ? await fetchAllProducts() : await fetchProductsByCategory(categoryId);

      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);
        fetchedProducts = fetchedProducts.filter((product) => {
          const price = product.sale_price ?? product.price;
          return price >= minPrice && price <= maxPrice;
        });
      }

      setProducts(fetchedProducts);

      // 이미지 로딩까지 완료된 후에 보여줌
      const imageLoadPromises = fetchedProducts.map((product) => {
        return new Promise<void>((resolve) => {
          if (!product.image) return resolve();
          const img = new Image();
          img.src = product.image;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });

      await Promise.all(imageLoadPromises);

      setIsLoading(false);
    };

    loadProducts();
  }, [categoryId, priceRange]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "Low-price":
        return (a.sale_price ?? a.price) - (b.sale_price ?? b.price);
      case "High-price":
        return (b.sale_price ?? b.price) - (a.sale_price ?? a.price);
      case "High-rating":
        return (b.rating ?? 0) - (a.rating ?? 0);
      default:
        return 0;
    }
  });

  return (
    <div
      className="w-full h-full
    max-sm:pb-12"
    >
      <div
        className="w-full flex flex-row items-center pb-10
      max-sm:justify-between max-sm:mt-3 max-sm:pt-3 max-sm:pb-3 max-sm:mb-12 max-sm:border-t max-sm:border-b max-sm:border-neutral-3"
      >
        <div
          className="w-1/2 text-body1Semi font-body-semi
        max-sm:w-auto max-sm:text-body2Semi"
        >
          {categoryId === 0 ? "All Rooms" : toUppercaseFirstLetters(categories[categoryId - 1].name)}
        </div>
        <div
          className="w-1/2 flex flex-row gap-6 justify-end items-center
         max-sm:w-auto max-sm:justify-end"
        >
          <div
            className="relative text-body2Semi font-body-semi
            cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative flex flex-row items-center w-28">
              {sortOption}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0"
              >
                <path
                  d="M5.22705 7.5L10.227 12.5L15.227 7.5"
                  stroke="#121212"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {isOpen && (
              <ul className="z-50 absolute left-0 top-6 mt-3 w-auto bg-white border border-neutral-3 rounded-md shadow-lg">
                {sortOptions.map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 cursor-pointer transition-colors duration-300 hover:bg-neutral-2 font-body text-buttonXS"
                    onClick={() => {
                      setSortOption(option === "Default" ? "Sort by" : option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* 데스크탑 정렬옵션 */}
          <div
            className="flex flex-row
          max-sm:hidden"
          >
            <ViewOption
              children={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-neutral-4 
                        transition-colors duration-300 group-hover:fill-black"
                >
                  <path d="M1.5 3C1.5 2.60218 1.65804 2.22064 1.93934 1.93934C2.22064 1.65804 2.60218 1.5 3 1.5H6C6.39782 1.5 6.77936 1.65804 7.06066 1.93934C7.34196 2.22064 7.5 2.60218 7.5 3V6C7.5 6.39782 7.34196 6.77936 7.06066 7.06066C6.77936 7.34196 6.39782 7.5 6 7.5H3C2.60218 7.5 2.22064 7.34196 1.93934 7.06066C1.65804 6.77936 1.5 6.39782 1.5 6V3ZM9 3C9 2.60218 9.15804 2.22064 9.43934 1.93934C9.72064 1.65804 10.1022 1.5 10.5 1.5H13.5C13.8978 1.5 14.2794 1.65804 14.5607 1.93934C14.842 2.22064 15 2.60218 15 3V6C15 6.39782 14.842 6.77936 14.5607 7.06066C14.2794 7.34196 13.8978 7.5 13.5 7.5H10.5C10.1022 7.5 9.72064 7.34196 9.43934 7.06066C9.15804 6.77936 9 6.39782 9 6V3ZM16.5 3C16.5 2.60218 16.658 2.22064 16.9393 1.93934C17.2206 1.65804 17.6022 1.5 18 1.5H21C21.3978 1.5 21.7794 1.65804 22.0607 1.93934C22.342 2.22064 22.5 2.60218 22.5 3V6C22.5 6.39782 22.342 6.77936 22.0607 7.06066C21.7794 7.34196 21.3978 7.5 21 7.5H18C17.6022 7.5 17.2206 7.34196 16.9393 7.06066C16.658 6.77936 16.5 6.39782 16.5 6V3ZM1.5 10.5C1.5 10.1022 1.65804 9.72064 1.93934 9.43934C2.22064 9.15804 2.60218 9 3 9H6C6.39782 9 6.77936 9.15804 7.06066 9.43934C7.34196 9.72064 7.5 10.1022 7.5 10.5V13.5C7.5 13.8978 7.34196 14.2794 7.06066 14.5607C6.77936 14.842 6.39782 15 6 15H3C2.60218 15 2.22064 14.842 1.93934 14.5607C1.65804 14.2794 1.5 13.8978 1.5 13.5V10.5ZM9 10.5C9 10.1022 9.15804 9.72064 9.43934 9.43934C9.72064 9.15804 10.1022 9 10.5 9H13.5C13.8978 9 14.2794 9.15804 14.5607 9.43934C14.842 9.72064 15 10.1022 15 10.5V13.5C15 13.8978 14.842 14.2794 14.5607 14.5607C14.2794 14.842 13.8978 15 13.5 15H10.5C10.1022 15 9.72064 14.842 9.43934 14.5607C9.15804 14.2794 9 13.8978 9 13.5V10.5ZM16.5 10.5C16.5 10.1022 16.658 9.72064 16.9393 9.43934C17.2206 9.15804 17.6022 9 18 9H21C21.3978 9 21.7794 9.15804 22.0607 9.43934C22.342 9.72064 22.5 10.1022 22.5 10.5V13.5C22.5 13.8978 22.342 14.2794 22.0607 14.5607C21.7794 14.842 21.3978 15 21 15H18C17.6022 15 17.2206 14.842 16.9393 14.5607C16.658 14.2794 16.5 13.8978 16.5 13.5V10.5ZM1.5 18C1.5 17.6022 1.65804 17.2206 1.93934 16.9393C2.22064 16.658 2.60218 16.5 3 16.5H6C6.39782 16.5 6.77936 16.658 7.06066 16.9393C7.34196 17.2206 7.5 17.6022 7.5 18V21C7.5 21.3978 7.34196 21.7794 7.06066 22.0607C6.77936 22.342 6.39782 22.5 6 22.5H3C2.60218 22.5 2.22064 22.342 1.93934 22.0607C1.65804 21.7794 1.5 21.3978 1.5 21V18ZM9 18C9 17.6022 9.15804 17.2206 9.43934 16.9393C9.72064 16.658 10.1022 16.5 10.5 16.5H13.5C13.8978 16.5 14.2794 16.658 14.5607 16.9393C14.842 17.2206 15 17.6022 15 18V21C15 21.3978 14.842 21.7794 14.5607 22.0607C14.2794 22.342 13.8978 22.5 13.5 22.5H10.5C10.1022 22.5 9.72064 22.342 9.43934 22.0607C9.15804 21.7794 9 21.3978 9 21V18ZM16.5 18C16.5 17.6022 16.658 17.2206 16.9393 16.9393C17.2206 16.658 17.6022 16.5 18 16.5H21C21.3978 16.5 21.7794 16.658 22.0607 16.9393C22.342 17.2206 22.5 17.6022 22.5 18V21C22.5 21.3978 22.342 21.7794 22.0607 22.0607C21.7794 22.342 21.3978 22.5 21 22.5H18C17.6022 22.5 17.2206 22.342 16.9393 22.0607C16.658 21.7794 16.5 21.3978 16.5 21V18Z" />
                </svg>
              }
            />
            <ViewOption
              children={
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-neutral-4 
                        transition-colors duration-300 group-hover:fill-black"
                >
                  <path d="M8.75 13.5C9.34674 13.5 9.91903 13.7371 10.341 14.159C10.7629 14.581 11 15.1533 11 15.75V19.25C11 19.8467 10.7629 20.419 10.341 20.841C9.91903 21.2629 9.34674 21.5 8.75 21.5H5.25C4.65326 21.5 4.08097 21.2629 3.65901 20.841C3.23705 20.419 3 19.8467 3 19.25V15.75C3 15.1533 3.23705 14.581 3.65901 14.159C4.08097 13.7371 4.65326 13.5 5.25 13.5H8.75ZM18.75 13.5C19.3467 13.5 19.919 13.7371 20.341 14.159C20.7629 14.581 21 15.1533 21 15.75V19.25C21 19.8467 20.7629 20.419 20.341 20.841C19.919 21.2629 19.3467 21.5 18.75 21.5H15.25C14.6533 21.5 14.081 21.2629 13.659 20.841C13.2371 20.419 13 19.8467 13 19.25V15.75C13 15.1533 13.2371 14.581 13.659 14.159C14.081 13.7371 14.6533 13.5 15.25 13.5H18.75ZM8.75 3.5C9.34674 3.5 9.91903 3.73705 10.341 4.15901C10.7629 4.58097 11 5.15326 11 5.75V9.25C11 9.84674 10.7629 10.419 10.341 10.841C9.91903 11.2629 9.34674 11.5 8.75 11.5H5.25C4.65326 11.5 4.08097 11.2629 3.65901 10.841C3.23705 10.419 3 9.84674 3 9.25V5.75C3 5.15326 3.23705 4.58097 3.65901 4.15901C4.08097 3.73705 4.65326 3.5 5.25 3.5H8.75ZM18.75 3.5C19.3467 3.5 19.919 3.73705 20.341 4.15901C20.7629 4.58097 21 5.15326 21 5.75V9.25C21 9.84674 20.7629 10.419 20.341 10.841C19.919 11.2629 19.3467 11.5 18.75 11.5H15.25C14.6533 11.5 14.081 11.2629 13.659 10.841C13.2371 10.419 13 9.84674 13 9.25V5.75C13 5.15326 13.2371 4.58097 13.659 4.15901C14.081 3.73705 14.6533 3.5 15.25 3.5H18.75Z" />
                </svg>
              }
            />
            <ViewOption
              children={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-neutral-4 
                        transition-colors duration-300 group-hover:fill-black"
                >
                  <path d="M8.75 13C9.34674 13 9.91903 13.2371 10.341 13.659C10.7629 14.081 11 14.6533 11 15.25V18.75C11 19.3467 10.7629 19.919 10.341 20.341C9.91903 20.7629 9.34674 21 8.75 21H5.25C4.65326 21 4.08097 20.7629 3.65901 20.341C3.23705 19.919 3 19.3467 3 18.75V15.25C3 14.6533 3.23705 14.081 3.65901 13.659C4.08097 13.2371 4.65326 13 5.25 13H8.75ZM18.75 13C19.3467 13 19.919 13.2371 20.341 13.659C20.7629 14.081 21 14.6533 21 15.25V18.75C21 19.3467 20.7629 19.919 20.341 20.341C19.919 20.7629 19.3467 21 18.75 21H15.25C14.6533 21 14.081 20.7629 13.659 20.341C13.2371 19.919 13 19.3467 13 18.75V15.25C13 14.6533 13.2371 14.081 13.659 13.659C14.081 13.2371 14.6533 13 15.25 13H18.75ZM8.75 3C9.34674 3 9.91903 3.23705 10.341 3.65901C10.7629 4.08097 11 4.65326 11 5.25V8.75C11 9.34674 10.7629 9.91903 10.341 10.341C9.91903 10.7629 9.34674 11 8.75 11H5.25C4.65326 11 4.08097 10.7629 3.65901 10.341C3.23705 9.91903 3 9.34674 3 8.75V5.25C3 4.65326 3.23705 4.08097 3.65901 3.65901C4.08097 3.23705 4.65326 3 5.25 3H8.75ZM18.75 3C19.3467 3 19.919 3.23705 20.341 3.65901C20.7629 4.08097 21 4.65326 21 5.25V8.75C21 9.34674 20.7629 9.91903 20.341 10.341C19.919 10.7629 19.3467 11 18.75 11H15.25C14.6533 11 14.081 10.7629 13.659 10.341C13.2371 9.91903 13 9.34674 13 8.75V5.25C13 4.65326 13.2371 4.08097 13.659 3.65901C14.081 3.23705 14.6533 3 15.25 3H18.75Z" />
                  <path d="M3 6H10.998V18H3V6Z" />
                  <path d="M13.002 6H21V18H13.002V6Z" />
                </svg>
              }
            />
            <ViewOption
              children={
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-neutral-4 
                        transition-colors duration-300 group-hover:fill-black"
                >
                  <path d="M12.9999 15.75C12.9999 15.1533 13.237 14.581 13.659 14.159C14.0809 13.7371 14.6532 13.5 15.2499 13.5L18.7499 13.5C19.3467 13.5 19.919 13.7371 20.3409 14.159C20.7629 14.581 20.9999 15.1533 20.9999 15.75L20.9999 19.25C20.9999 19.8467 20.7629 20.419 20.3409 20.841C19.919 21.2629 19.3467 21.5 18.7499 21.5L15.2499 21.5C14.6532 21.5 14.0809 21.2629 13.659 20.841C13.237 20.419 12.9999 19.8467 12.9999 19.25L12.9999 15.75ZM12.9999 5.75C12.9999 5.15326 13.237 4.58097 13.6589 4.15901C14.0809 3.73705 14.6532 3.5 15.2499 3.5L18.7499 3.5C19.3467 3.5 19.919 3.73705 20.3409 4.15901C20.7629 4.58097 20.9999 5.15326 20.9999 5.75L20.9999 9.25C20.9999 9.84674 20.7629 10.419 20.3409 10.841C19.919 11.2629 19.3467 11.5 18.7499 11.5L15.2499 11.5C14.6532 11.5 14.0809 11.2629 13.6589 10.841C13.237 10.419 12.9999 9.84674 12.9999 9.25L12.9999 5.75ZM2.99994 15.75C2.99994 15.1533 3.23699 14.581 3.65895 14.159C4.08091 13.7371 4.6532 13.5 5.24994 13.5L8.74994 13.5C9.34668 13.5 9.91897 13.7371 10.3409 14.159C10.7629 14.581 10.9999 15.1533 10.9999 15.75L10.9999 19.25C10.9999 19.8467 10.7629 20.419 10.3409 20.841C9.91897 21.2629 9.34668 21.5 8.74994 21.5L5.24994 21.5C4.6532 21.5 4.08091 21.2629 3.65895 20.841C3.23699 20.419 2.99994 19.8467 2.99994 19.25L2.99994 15.75ZM2.99994 5.75C2.99994 5.15326 3.23699 4.58097 3.65895 4.15901C4.08091 3.73705 4.6532 3.5 5.24994 3.5L8.74994 3.5C9.34668 3.5 9.91897 3.73705 10.3409 4.15901C10.7629 4.58097 10.9999 5.15326 10.9999 5.75L10.9999 9.25C10.9999 9.84674 10.7629 10.419 10.3409 10.841C9.91897 11.2629 9.34668 11.5 8.74994 11.5L5.24994 11.5C4.6532 11.5 4.08091 11.2629 3.65895 10.841C3.23699 10.419 2.99994 9.84674 2.99994 9.25L2.99994 5.75Z" />
                  <path d="M5.99994 21.5L5.99994 13.502L17.9999 13.502L17.9999 21.5L5.99994 21.5Z" />
                  <path d="M5.99994 11.498L5.99994 3.5L17.9999 3.5L17.9999 11.498L5.99994 11.498Z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="max-w-[834px] grid grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-x-2 max-sm:gap-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="h-2/3 flex justify-center items-center text-neutral-4 font-body max-sm:text-center max-sm:h-40">
          No products found for the selected category.
        </div>
      ) : (
        <div className="max-w-[834px] grid grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-x-2 max-sm:gap-y-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.product_id}
              {...product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
