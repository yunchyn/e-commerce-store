"use client";
import { useEffect, useState } from "react";
import { IProduct, ProductCard } from "./ProductCard";
import { fetchAllProducts } from "@/dataHandler";

export default function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchAllProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    <div className="max-w-[834px] grid grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
}
