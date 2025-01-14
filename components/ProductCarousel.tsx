import { ProductCard } from "./ProductCard";

export default function ProductCarousel() {
  return (
    <div className="container overflow-x-auto scrollbar pb-12">
      <div className="flex flex-row gap-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
