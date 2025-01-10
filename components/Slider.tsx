export default function Slider() {
  return (
    <div className="bg-slate-100">
      <div className="relative w-full h-auto">
        <svg
          className="absolute left-4 h-full flex items-center"
          width="84"
          height="84"
          viewBox="0 0 84 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_4_11220)">
            <rect
              x="16"
              y="8"
              width="52"
              height="52"
              rx="26"
              fill="white"
            />
            <path
              d="M32.6667 34H51.3334"
              stroke="#6C7275"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32.6667 34L40.6667 42"
              stroke="#6C7275"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32.6667 34L40.6667 26"
              stroke="#6C7275"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_4_11220"
              x="0"
              y="0"
              width="84"
              height="84"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="8" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0364401 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_4_11220"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_4_11220"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <svg
          className="absolute right-4 h-full flex items-center"
          width="84"
          height="84"
          viewBox="0 0 84 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_4_11187)">
            <rect
              x="16"
              y="8"
              width="52"
              height="52"
              rx="26"
              fill="white"
            />
            <path
              d="M32.6667 34H51.3334"
              stroke="#121212"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M43.3333 42L51.3333 34"
              stroke="#121212"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M43.3333 26L51.3333 34"
              stroke="#121212"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_4_11187"
              x="0"
              y="0"
              width="84"
              height="84"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="8" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0364401 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_4_11187"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_4_11187"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <img
          src="/img/slider1.png"
          alt="slider"
        />
      </div>
    </div>
  );
}
