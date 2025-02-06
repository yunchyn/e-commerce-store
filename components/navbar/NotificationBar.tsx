"use client";

import Link from "next/link";
import { useState } from "react";

export default function NotificationBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className="relative bg-neutral-2 w-full h-10 text-caption1Semi font-caption-semi flex justify-center items-center gap-3
    max-sm:text-caption2Semi"
    >
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.0181 12.8356L19.7727 13.5444H19.7727L20.0181 12.8356ZM20.0181 7.16437L20.2635 7.8731V7.8731L20.0181 7.16437ZM1.98189 12.8356L2.22727 13.5444H2.22727L1.98189 12.8356ZM1.98189 7.16437L1.73652 7.8731L1.73652 7.8731L1.98189 7.16437ZM14.5303 7.53033C14.8232 7.23744 14.8232 6.76256 14.5303 6.46967C14.2374 6.17678 13.7626 6.17678 13.4697 6.46967L14.5303 7.53033ZM7.46967 12.4697C7.17678 12.7626 7.17678 13.2374 7.46967 13.5303C7.76256 13.8232 8.23744 13.8232 8.53033 13.5303L7.46967 12.4697ZM5 18.25C3.20507 18.25 1.75 16.7949 1.75 15H0.25C0.25 17.6234 2.37665 19.75 5 19.75V18.25ZM20.25 15C20.25 16.7949 18.7949 18.25 17 18.25V19.75C19.6234 19.75 21.75 17.6234 21.75 15H20.25ZM17 1.75C18.7949 1.75 20.25 3.20507 20.25 5H21.75C21.75 2.37665 19.6234 0.25 17 0.25V1.75ZM5 0.25C2.37665 0.25 0.25 2.37665 0.25 5H1.75C1.75 3.20507 3.20507 1.75 5 1.75V0.25ZM20.2635 12.1269C19.3815 11.8216 18.75 10.9836 18.75 10H17.25C17.25 11.6424 18.3054 13.0363 19.7727 13.5444L20.2635 12.1269ZM18.75 10C18.75 9.01644 19.3815 8.17844 20.2635 7.8731L19.7727 6.45565C18.3054 6.96367 17.25 8.35761 17.25 10H18.75ZM3.25 10C3.25 10.9836 2.61845 11.8216 1.73652 12.1269L2.22727 13.5444C3.69461 13.0363 4.75 11.6424 4.75 10H3.25ZM1.73652 7.8731C2.61845 8.17844 3.25 9.01644 3.25 10H4.75C4.75 8.35762 3.69462 6.96367 2.22727 6.45565L1.73652 7.8731ZM21.75 6V5H20.25V6H21.75ZM20.25 14V15H21.75V14H20.25ZM0.25 14V15H1.75V14H0.25ZM1.75 6V5H0.25V6H1.75ZM17 18.25H5V19.75H17V18.25ZM17 0.25H5V1.75H17V0.25ZM1.73652 12.1269C1.05785 12.3619 0.25 12.9975 0.25 14H1.75C1.75 13.9441 1.77081 13.8708 1.85172 13.7813C1.9366 13.6873 2.06974 13.5989 2.22727 13.5444L1.73652 12.1269ZM20.2635 7.8731C20.9422 7.63813 21.75 7.00246 21.75 6H20.25C20.25 6.05587 20.2292 6.12917 20.1483 6.21871C20.0634 6.31265 19.9303 6.40111 19.7727 6.45565L20.2635 7.8731ZM2.22727 6.45565C2.06974 6.40111 1.9366 6.31265 1.85172 6.21871C1.77081 6.12917 1.75 6.05587 1.75 6H0.25C0.25 7.00246 1.05785 7.63813 1.73652 7.8731L2.22727 6.45565ZM19.7727 13.5444C19.9303 13.5989 20.0634 13.6873 20.1483 13.7813C20.2292 13.8708 20.25 13.9441 20.25 14H21.75C21.75 12.9975 20.9422 12.3619 20.2635 12.1269L19.7727 13.5444ZM8.25 7C8.25 7.13807 8.13807 7.25 8 7.25V8.75C8.9665 8.75 9.75 7.9665 9.75 7H8.25ZM8 7.25C7.86193 7.25 7.75 7.13807 7.75 7H6.25C6.25 7.9665 7.0335 8.75 8 8.75V7.25ZM7.75 7C7.75 6.86193 7.86193 6.75 8 6.75V5.25C7.0335 5.25 6.25 6.0335 6.25 7H7.75ZM8 6.75C8.13807 6.75 8.25 6.86193 8.25 7H9.75C9.75 6.0335 8.9665 5.25 8 5.25V6.75ZM14.25 13C14.25 13.1381 14.1381 13.25 14 13.25V14.75C14.9665 14.75 15.75 13.9665 15.75 13H14.25ZM14 13.25C13.8619 13.25 13.75 13.1381 13.75 13H12.25C12.25 13.9665 13.0335 14.75 14 14.75V13.25ZM13.75 13C13.75 12.8619 13.8619 12.75 14 12.75V11.25C13.0335 11.25 12.25 12.0335 12.25 13H13.75ZM14 12.75C14.1381 12.75 14.25 12.8619 14.25 13H15.75C15.75 12.0335 14.9665 11.25 14 11.25V12.75ZM13.4697 6.46967L7.46967 12.4697L8.53033 13.5303L14.5303 7.53033L13.4697 6.46967Z"
          fill="#141718"
        />
      </svg>
      30% off storewide — Limited time!
      <Link
        href="/sale"
        className="flex flex-row text-blue border-b border-blue
        max-sm:hidden"
      >
        Shop Now
        <svg
          className="fill-blue"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.0909 7.26521C14.4968 6.8906 15.1294 6.9159 15.504 7.32172L18.7348 10.8217C19.0884 11.2047 19.0884 11.7952 18.7348 12.1782L15.504 15.6783C15.1294 16.0841 14.4968 16.1094 14.091 15.7348C13.6851 15.3602 13.6598 14.7276 14.0344 14.3217L15.716 12.5L6 12.5C5.44771 12.5 5 12.0523 5 11.5C5 10.9477 5.44771 10.5 6 10.5L15.716 10.5L14.0344 8.67829C13.6598 8.27247 13.6851 7.63981 14.0909 7.26521Z"
          />
        </svg>
      </Link>
      <div
        onClick={() => setIsVisible(false)}
        className="absolute right-3 cursor-pointer"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.4419 5.44194C15.686 5.19786 15.686 4.80214 15.4419 4.55806C15.1979 4.31398 14.8021 4.31398 14.5581 4.55806L10 9.11612L5.44194 4.55806C5.19786 4.31398 4.80214 4.31398 4.55806 4.55806C4.31398 4.80214 4.31398 5.19786 4.55806 5.44194L9.11612 10L4.55806 14.5581C4.31398 14.8021 4.31398 15.1979 4.55806 15.4419C4.80214 15.686 5.19786 15.686 5.44194 15.4419L10 10.8839L14.5581 15.4419C14.8021 15.686 15.1979 15.686 15.4419 15.4419C15.686 15.1979 15.686 14.8021 15.4419 14.5581L10.8839 10L15.4419 5.44194Z"
            fill="#343839"
          />
        </svg>
      </div>
    </div>
  );
}
