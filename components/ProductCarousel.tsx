interface ProductProps {
  name: string;
  rating: number;
  price: number;
  isOnSale: boolean;
  salePrice?: number;
  image: string;
  description?: string;
  measurements?: string;
  colors?: string[];
}

export default function ProductCarousel() {
  const ProductCard = ({ name, rating, price, isOnSale, salePrice }: ProductProps) => {
    return (
      <div className="flex flex-col gap-1 text-neutral-7">
        <div className="w-[262px] h-[349px] bg-neutral-2"></div>
        <div className="flex flex-row text-neutral-5 pt-3">
          {Array.from({ length: Math.floor(rating) }, (_, index) => (
            <svg
              key={index}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.53834 1.10997C7.70914 0.699319 8.29086 0.699318 8.46166 1.10996L9.99874 4.80556C10.0707 4.97868 10.2336 5.09696 10.4204 5.11194L14.4102 5.4318C14.8535 5.46734 15.0332 6.02059 14.6955 6.30993L11.6557 8.91378C11.5133 9.03576 11.4512 9.22715 11.4947 9.40952L12.4234 13.3028C12.5265 13.7354 12.0559 14.0773 11.6764 13.8455L8.26063 11.7592C8.10062 11.6615 7.89938 11.6615 7.73937 11.7592L4.32363 13.8455C3.94408 14.0773 3.47345 13.7354 3.57665 13.3028L4.50534 9.40952C4.54884 9.22715 4.48665 9.03576 4.34426 8.91378L1.30453 6.30993C0.966758 6.02059 1.14652 5.46734 1.58985 5.4318L5.57955 5.11194C5.76645 5.09696 5.92925 4.97868 6.00126 4.80556L7.53834 1.10997Z"
                fill="#343839"
              />
            </svg>
          ))}
        </div>
        <div className="font-body-semi text-body2Semi">{name}</div>
        <div className="font-caption text-caption1Semi">
          {isOnSale && salePrice ? (
            <div className="flex flex-row gap-3">
              <span>${salePrice.toFixed(2)}</span>
              <span className="line-through text-neutral-4">${price.toFixed(2)}</span>
            </div>
          ) : (
            <span>${price.toFixed(2)}</span>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-row gap-6">
      <ProductCard
        name="Loveseat Sofa"
        rating={5}
        price={400.0}
        isOnSale={true}
        salePrice={199.0}
        image=""
      />
    </div>
  );
}
