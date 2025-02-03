import Link from "next/link";

export default function Footer() {
  return (
    <div
      className="w-full flex flex-col gap-[49px] bg-neutral-7 text-neutral-1 text-2xl pt-20 px-40 pb-8
    max-sm:px-8 max-sm:py-8 max-sm:items-center"
    >
      <div
        className="flex flex-row items-center
      max-sm:flex-col"
      >
        <div
          className="w-1/2 flex flex-row gap-8
        max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:pb-10 max-sm:gap-4"
        >
          3legant.
          <svg
            width="1"
            height="24"
            viewBox="0 0 1 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-sm:hidden"
          >
            <rect
              width="1"
              height="24"
              fill="#6C7275"
            />
          </svg>
          <svg
            width="24"
            height="1"
            viewBox="0 0 24 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden max-sm:block"
          >
            <rect
              x="24"
              width="1"
              height="24"
              transform="rotate(90 24 0)"
              fill="#6C7275"
            />
          </svg>
          <p className="text-caption1 flex items-center font-caption text-neutral-3">Gift & Decoration Store</p>
        </div>
        <div
          className="w-1/2 flex flex-row justify-end gap-10 text-caption1 text-neutral-3 font-caption
        max-sm:w-full max-sm:flex-col max-sm:text-center"
        >
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/sale">Sale</Link>
          <Link href="/">Contact Us</Link>
        </div>
      </div>
      <div
        className="text-caption2 text-neutral-3 font-caption py-4 border-t border-neutral-4
      max-sm:w-full max-sm:text-center"
      >
        Copyright © 2023 3legant. All rights reserved
      </div>
    </div>
  );
}
