import { Category } from "@/components/ProductCard";
import ProductList from "@/components/ProductList";
import Link from "next/link";

export default function Shop() {
  const categories: Category[] = ["all rooms", "living room", "bedroom", "kitchen", "bathroom"];
  type PriceCategory = "0-50" | "51-100" | "101-200" | "201+";
  const priceCategories: PriceCategory[] = ["0-50", "51-100", "101-200", "201+"];

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="max-w-[1120px] mx-auto">
          {/* 배너 */}
          <div className="flex flex-col justify-center items-center">
            <div className="absolute flex flex-col text-center gap-6">
              <p className="text-buttonXS font-button flex flex-row gap-4 justify-center items-center">
                <span className="text-[#605F5F] flex flex-row justify-center items-center gap-2">
                  Home
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.58423 3L7.58423 6L4.58423 9"
                      stroke="#605F5F"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Shop
              </p>
              <p className="text-headline3 font-headline">Shop page</p>
              <p className="text-body1 font-body">Let’s design the place you always imagined.</p>
            </div>
            <img
              src="/img/shop-banner.png"
              alt="banner"
            />
          </div>

          <div className="w-full flex flex-row py-16">
            {/* 필터 */}
            <div className="w-1/4 flex flex-col  gap-8">
              <div className="flex flex-row items-center gap-2 text-body1Semi font-body-semi text-neutral-7">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 7H6M6 7C6 8.65685 7.34315 10 9 10C10.6569 10 12 8.65685 12 7C12 5.34315 10.6569 4 9 4C7.34315 4 6 5.34315 6 7ZM3 17H9M18 17H21M18 17C18 18.6569 16.6569 20 15 20C13.3431 20 12 18.6569 12 17C12 15.3431 13.3431 14 15 14C16.6569 14 18 15.3431 18 17ZM15 7H21"
                    stroke="#141718"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Filter
              </div>

              {/* 카테고리 메뉴 */}
              <div className="flex flex-col gap-4">
                <p className="text-neutral-7 text-body2Semi font-body-semi">CATEGORIES</p>
                <div className="text-[#807E7E] text-caption1 font-body-semi flex flex-col gap-3">
                  {categories.map((category, index) => (
                    <Link
                      href={`/shop?category=${category}`}
                      key={index}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 가격 필터 */}
              <div className="flex flex-col gap-4">
                <p className="text-neutral-7 text-body2Semi font-body-semi">PRICE</p>
                <div className="text-[#807E7E] text-caption1 font-body-semi flex flex-col gap-3">
                  {priceCategories.map((category, index) => (
                    <p key={index}>{category}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* 제품리스트 */}
            <div className="flex flex-col justify-end w-3/4">
              <ProductList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
