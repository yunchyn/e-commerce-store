import { IProduct, ProductCard } from "./ProductCard";

interface IProductCarousel {
  products?: IProduct[];
}

export default function ProductCarousel({ products = [] }: IProductCarousel) {
  return (
    <div
      className="container overflow-x-auto scrollbar pb-12
    max-sm:pb-10"
    >
      <div
        className="flex flex-row gap-6
      max-sm:gap-4"
      >
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            {...product}
          />
        ))}
      </div>
    </div>
  );
}
