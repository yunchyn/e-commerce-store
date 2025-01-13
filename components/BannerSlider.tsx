"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BannerSlider.css";

const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
    >
      <svg
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
    </div>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
    >
      <svg
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
    </div>
  );
};

export default function BannerSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots: any) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };

  const slides = [
    { id: 1, image: "/img/slider1.png", alt: "Slide 1" },
    { id: 2, image: "/img/slider1.png", alt: "Slide 2" },
    { id: 3, image: "/img/slider1.png", alt: "Slide 3" },
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
