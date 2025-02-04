"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10">
      <svg
        width="72"
        height="73"
        viewBox="0 0 72 73"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          filter="url(#filter0_d_355_7871)"
          className="cursor-pointer"
          onClick={onClick}
        >
          <rect
            x="16"
            y="8.5"
            width="40"
            height="40"
            rx="20"
            fill="white"
          />
          <path
            d="M29 28.5H43"
            stroke="#121212"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29 28.5L35 34.5"
            stroke="#121212"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29 28.5L35 22.5"
            stroke="#121212"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_355_7871"
            x="0"
            y="0.5"
            width="72"
            height="72"
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
              result="effect1_dropShadow_355_7871"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_355_7871"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
      <svg
        width="72"
        height="73"
        viewBox="0 0 72 73"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          filter="url(#filter0_d_355_7876)"
          className="cursor-pointer"
          onClick={onClick}
        >
          <rect
            x="56"
            y="48.5"
            width="40"
            height="40"
            rx="20"
            transform="rotate(-180 56 48.5)"
            fill="white"
          />
          <path
            d="M43 28.5L29 28.5"
            stroke="#141718"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M43 28.5L37 22.5"
            stroke="#141718"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M43 28.5L37 34.5"
            stroke="#141718"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_355_7876"
            x="0"
            y="0.5"
            width="72"
            height="72"
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
              result="effect1_dropShadow_355_7876"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_355_7876"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default function ProductSlider({ image }: { image: string }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const slides = [
    { id: 1, image: image, alt: "Slide 1" },
    { id: 2, image: image, alt: "Slide 2" },
    { id: 3, image: image, alt: "Slide 3" },
  ];

  return (
    <Slider {...settings}>
      {slides.map((slide) => (
        <div key={slide.id}>
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </Slider>
  );
}
