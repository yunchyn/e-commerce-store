import { ProductCard } from "./ProductCard";

export default function ProductCarousel() {
  return (
    <div className="container overflow-x-auto scrollbar pb-12">
      <div className="flex flex-row gap-6">
        <ProductCard
          name="Loveseat Sofa"
          rating={5}
          price={400.0}
          isOnSale={true}
          salePrice={199.0}
          image=""
        />
        <ProductCard
          name="Loveseat Sofa"
          rating={5}
          price={400.0}
          isOnSale={true}
          salePrice={199.0}
          image=""
        />
        <ProductCard
          name="Loveseat Sofa"
          rating={5}
          price={400.0}
          isOnSale={true}
          salePrice={199.0}
          image=""
        />
        <ProductCard
          name="Loveseat Sofa"
          rating={5}
          price={400.0}
          isOnSale={true}
          salePrice={199.0}
          image=""
        />
        <ProductCard
          name="Loveseat Sofa"
          rating={5}
          price={400.0}
          isOnSale={true}
          salePrice={199.0}
          image=""
        />
        <ProductCard
          name="Loveseat Sofa"
          rating={5}
          price={400.0}
          isOnSale={true}
          salePrice={199.0}
          image=""
        />
      </div>
    </div>
  );
}
