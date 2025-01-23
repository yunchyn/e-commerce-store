import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full flex flex-col gap-[49px] bg-neutral-7 text-neutral-1 text-2xl pt-20 px-40 pb-8">
      <div className="flex flex-row items-center">
        <div className="w-1/2 flex flex-row gap-8">
          3legant.
          <svg
            width="1"
            height="24"
            viewBox="0 0 1 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="1"
              height="24"
              fill="#6C7275"
            />
          </svg>
          <p className="text-caption1 flex items-center font-caption text-neutral-3">Gift & Decoration Store</p>
        </div>
        <div className="w-1/2 flex flex-row justify-end gap-10 text-caption1 text-neutral-3 font-caption">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/sale">Sale</Link>
          <Link href="/">Contact Us</Link>
        </div>
      </div>
      <div className="text-caption2 text-neutral-3 font-caption py-4 border-t border-neutral-4">
        Copyright © 2023 3legant. All rights reserved
      </div>
    </div>
  );
}
