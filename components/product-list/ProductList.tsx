'use client';

import { useEffect, useState } from 'react';
import { Category, IProduct, ProductCard } from './ProductCard';
import { fetchAllProducts, fetchProductsByCategory } from '@/components/dataHandler';
import { useSearchParams } from 'next/navigation';
import { toUppercaseFirstLetters } from '../utilities';
import { ProductCardSkeleton } from '../SkeletonComponents';
import ListSortOption from './ListSortOption';

export default function ProductList() {
  const searchParams = useSearchParams();
  const priceRange = searchParams.get('priceRange') || '';
  const categories: { id: number; name: Category }[] = [
    { id: 1, name: 'living room' },
    { id: 2, name: 'bedroom' },
    { id: 3, name: 'kitchen' },
    { id: 4, name: 'bathroom' },
  ];
  const categoryId = categories.find((cat) => cat.name === (searchParams.get('category') || 'all rooms'))?.id || 0;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('Sort by');
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = ['Default', 'Low-price', 'High-price', 'High-rating'];

  useEffect(() => {
    setIsLoading(true);
    const loadProducts = async () => {
      let fetchedProducts = categoryId === 0 ? await fetchAllProducts() : await fetchProductsByCategory(categoryId);

      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
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
      case 'Low-price':
        return (a.sale_price ?? a.price) - (b.sale_price ?? b.price);
      case 'High-price':
        return (b.sale_price ?? b.price) - (a.sale_price ?? a.price);
      case 'High-rating':
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
          {categoryId === 0 ? 'All Rooms' : toUppercaseFirstLetters(categories[categoryId - 1].name)}
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
                      setSortOption(option === 'Default' ? 'Sort by' : option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* <ListSortOption/> */}
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
