export function toUppercaseFirstLetters(text: string): string {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function toLowercaseFirstLetters(text: string): string {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
    .join(" ");
}

export function StarRating({ rating }: { rating?: number }) {
  const validRating = rating ?? 0;
  const fullStars = Math.floor(validRating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex flex-row text-neutral-5">
      {Array.from({ length: fullStars }, (_, index) => (
        <svg
          key={`full-${index}`}
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
      {Array.from({ length: emptyStars }, (_, index) => (
        <svg
          key={`empty-${index}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1.30198L9.53708 4.99757C9.68109 5.34381 10.0067 5.58038 10.3805 5.61034L14.3702 5.9302L11.3305 8.53405C11.0457 8.77801 10.9213 9.16078 11.0083 9.52554L11.937 13.4188L8.52125 11.3325C8.20124 11.137 7.79876 11.137 7.47875 11.3325L4.063 13.4188L4.99169 9.52554C5.0787 9.16078 4.95433 8.778 4.66954 8.53405L1.6298 5.9302L5.61951 5.61034C5.9933 5.58038 6.31891 5.34381 6.46292 4.99757L8 1.30198Z"
            stroke="#6C7275"
          />
        </svg>
      ))}
    </div>
  );
}
