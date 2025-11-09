import React from 'react';

export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="w-full py-3 pl-12 border border-neutral-7 rounded-md
            text-caption1 font-caption mt-4 outline-none"
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-4 top-[27px]"
      >
        <path
          d="M18.5 18.5L22 22M21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21C16.7467 21 21 16.7467 21 11.5Z"
          stroke="#141718"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
