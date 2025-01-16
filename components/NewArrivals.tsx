"use client";

import { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";
import { IProduct } from "./ProductCard";
import { fetchNewProducts } from "@/components/dataHandler";

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
    <div className="pt-12">
      <div className="text-headline4">
        <p>New</p> <p>Arrivals</p>
      </div>
      <div className="pt-12">
        <ProductCarousel products={products} />
      </div>
    </div>
  );
}
