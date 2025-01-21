"use client";

import { useSearchParams } from "next/navigation";
import { toUppercaseFirstLetters } from "./utilities";
import Link from "next/link";

const Arrow = () => (
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
);

export default function BreadCrumb() {
  const category = useSearchParams().get("category") || "all rooms";
  return (
    <div className="py-4 flex flex-row items-center text-buttonXS font-button text-neutral-4 gap-2">
      <Link href="/">Home</Link>
      <Arrow />
      <Link href="/shop">Shop</Link>
      <Arrow />
      <Link
        href={`/shop?category=${category}`}
        className="text-neutral-7"
      >
        {toUppercaseFirstLetters(category)}
      </Link>
    </div>
  );
}
