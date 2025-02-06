"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "./product-list/ProductCard";
import { toUppercaseFirstLetters } from "./utilities";

const categories: Category[] = ["all rooms", "living room", "bedroom", "kitchen", "bathroom"];
const priceCategories = [
  { label: "All Price", min: 0, max: Infinity },
  { label: "$0.00 - 99.99", min: 0, max: 99.99 },
  { label: "$100.00 - 199.99", min: 100, max: 199.99 },
  { label: "$200.00 - 299.99", min: 200, max: 299.99 },
  { label: "$300.00+", min: 300, max: Infinity },
];

type MenuType = "category" | "price";

interface DesktopMenuProps {
  items: (Category | { label: string; min: number; max: number })[];
  searchParams: URLSearchParams;
  type: MenuType;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ items, searchParams, type }) => (
  <div className="text-[#807E7E] text-caption1 font-body-semi flex flex-col gap-3 max-sm:hidden">
    {items.map((item, index) => (
      <Link
        key={index}
        href={
          type === "category"
            ? `/shop?category=${item as Category}`
            : `/shop?category=${searchParams.get("category") || ""}&priceRange=${
                (item as { label: string; min: number; max: number }).min
              }-${(item as { label: string; min: number; max: number }).max}`
        }
      >
        <p className="hover:text-neutral-7 border-b-2 border-transparent hover:border-neutral-7 inline-block">
          {toUppercaseFirstLetters((item as { label: string }).label || (item as Category))}
        </p>
      </Link>
    ))}
  </div>
);

interface MobileDropdownProps {
  items: (Category | { label: string; min: number; max: number })[];
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedValue?: string;
  type: MenuType;
  isOpen: boolean;
  setIsOpenDropdown: () => void;
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({
  items,
  handleChange,
  selectedValue,
  type,
  isOpen,
  setIsOpenDropdown,
}) => {
  const handleSelect = (value: string) => {
    handleChange({ target: { value } } as ChangeEvent<HTMLSelectElement>);
    setIsOpenDropdown();
  };

  return (
    <div className="relative hidden max-sm:block">
      <div
        className="w-full border-2 border-neutral-4 rounded-lg px-4 py-2 bg-white text-neutral-7 cursor-pointer flex justify-between items-center"
        onClick={setIsOpenDropdown}
      >
        <span>{selectedValue || "All Room"}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z"
            fill="#6C7275"
          />
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute w-full mt-2 bg-white border border-neutral-3 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {items.map((item, index) => {
            const value =
              type === "category"
                ? (item as Category)
                : `${(item as { label: string; min: number; max: number }).min}-${
                    (item as { label: string; min: number; max: number }).max
                  }`;
            return (
              <li
                key={index}
                className={`px-4 py-2 text-neutral-4 cursor-pointer hover:bg-neutral-2 text-body2 font-body ${
                  selectedValue === value ? "bg-neutral-3 font-bold" : ""
                }`}
                onClick={() => handleSelect(value)}
              >
                {toUppercaseFirstLetters((item as { label: string }).label || (item as Category))}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default function CategoryDropdown() {
  const [selectedCategory, setSelectedCategory] = useState("All Room");
  const [selectedPrice, setSelectedPrice] = useState("All Price");
  const searchParams = useSearchParams();
  const router = useRouter();
  // 동시에 하나의 드롭다운만 열리도록 상태관리
  const [isOpenDropdown, setIsOpenDropdown] = useState<"category" | "price" | null>(null);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    router.push(`/shop?category=${selectedCategory}`);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedLabel =
      priceCategories.find((item) => `${item.min}-${item.max}` === selectedValue)?.label || "All Price";

    setSelectedPrice(selectedLabel);
    router.push(`/shop?category=${searchParams.get("category") || ""}&priceRange=${selectedValue}`);
  };

  return (
    <>
      {/* 카테고리 메뉴 */}
      <div className="flex flex-col gap-4">
        <p className="text-neutral-7 text-body2Semi font-body-semi">CATEGORIES</p>
        <DesktopMenu
          items={categories}
          searchParams={searchParams}
          type="category"
        />
        <MobileDropdown
          items={categories}
          handleChange={handleCategoryChange}
          selectedValue={toUppercaseFirstLetters(selectedCategory)}
          type="category"
          isOpen={isOpenDropdown === "category"}
          setIsOpenDropdown={() => setIsOpenDropdown(isOpenDropdown === "category" ? null : "category")}
        />
      </div>

      {/* 가격 필터 */}
      <div className="flex flex-col gap-4">
        <p className="text-neutral-7 text-body2Semi font-body-semi">PRICE</p>
        <DesktopMenu
          items={priceCategories}
          searchParams={searchParams}
          type="price"
        />
        <MobileDropdown
          items={priceCategories}
          handleChange={handlePriceChange}
          selectedValue={selectedPrice}
          type="price"
          isOpen={isOpenDropdown === "price"}
          setIsOpenDropdown={() => setIsOpenDropdown(isOpenDropdown === "price" ? null : "price")}
        />
      </div>
    </>
  );
}
