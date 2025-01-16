import Link from "next/link";
import { toLowercaseFirstLetters } from "./utilities";

export const ShopLink = ({ category, className = "" }: { category: string; className?: string }) => {
  return (
    <Link
      href={`/shop?category=${toLowercaseFirstLetters(category)}`}
      className={`absolute flex flex-col gap-3 text-headline5 m-12 cursor-pointer ${className}`}
    >
      {category}
      <div className="flex">
        <span className="flex flex-row items-center gap-1 text-buttonS border-b border-neutral-7">
          Shop Now
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.16666 10H15.8333"
              stroke="#141718"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.8333 15L15.8333 10"
              stroke="#141718"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.8333 5L15.8333 10"
              stroke="#141718"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default function CategoryLinks() {
  return (
    <div className="w-full flex flex-row gap-6">
      <div className="relative w-1/2">
        <ShopLink category="Living Room" />
        <img
          src="/img/living-room.png"
          alt="living-room"
        />
      </div>
      <div className="w-1/2 flex flex-col gap-6">
        <div className="w-full h-auto relative">
          <ShopLink
            category="Bedroom"
            className="bottom-0"
          />
          <img
            src="/img/bedroom.png"
            alt="bedroom"
          />
        </div>
        <div className="relative">
          <ShopLink
            category="Kitchen"
            className="bottom-0"
          />
          <img
            src="/img/kitchen.png"
            alt="kitchen"
          />
        </div>
      </div>
    </div>
  );
}
