import Link from "next/link";

export const ShopArea = ({ category, className = "" }: { category: string; className?: string }) => {
  return (
    <div
      className={`absolute flex flex-col gap-3 text-headline5 m-12 cursor-pointer ${className}
      max-sm:text-headline6 max-sm:m-8 max-sm:gap-1`}
    >
      {category}
      <div className="flex">
        <span
          className="flex flex-row items-center gap-1 text-buttonS border-b border-neutral-7
        max-sm:text-buttonXS"
        >
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
    </div>
  );
};

export default function CategoryLinks() {
  return (
    <div
      className="w-full flex flex-row gap-6
    max-sm:flex-col max-sm:gap-4"
    >
      <Link
        href="/shop?category=living-room"
        className="relative w-1/2
      max-sm:w-full"
      >
        <ShopArea category="Living Room" />
        <img
          src="/img/living-room.png"
          alt="living-room"
        />
      </Link>
      <div
        className="w-1/2 flex flex-col gap-6
      max-sm:w-full max-sm:gap-4"
      >
        <Link
          href="/shop?category=bedroom"
          className="w-full h-auto relative"
        >
          <ShopArea
            category="Bedroom"
            className="bottom-0"
          />
          <img
            src="/img/bedroom.png"
            alt="bedroom"
          />
        </Link>
        <Link
          href="/shop?category=kitchen"
          className="relative"
        >
          <ShopArea
            category="Kitchen"
            className="bottom-0"
          />
          <img
            src="/img/kitchen.png"
            alt="kitchen"
          />
        </Link>
      </div>
    </div>
  );
}
