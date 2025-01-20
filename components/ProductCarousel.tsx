import { IProduct, ProductCard } from "./ProductCard";

interface IProductCarousel {
  products?: IProduct[];
}

export default function ProductCarousel({ products = [] }: IProductCarousel) {
  return (
    <div className="container overflow-x-auto scrollbar pb-12">
      <div className="flex flex-row gap-6">
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
