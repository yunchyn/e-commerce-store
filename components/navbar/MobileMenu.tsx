"use client";

import { useState } from "react";
import Link from "next/link";
import { Category } from "../product-list/ProductCard";
import { toUppercaseFirstLetters } from "../utilities";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase";
import { clearSession } from "@/store/sessionSlice";

const categories: Category[] = ["all rooms", "living room", "bedroom", "kitchen", "bathroom"];

export default function MobileMenu() {
  const userSession = useSelector((state: RootState) => state.session);
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const goToUser = () => {
    if (userSession?.userId) {
      router.push("/user");
      setIsOpen(false);
    } else {
      router.push("/auth");
    }
  };

  const goToCart = () => {
    if (userSession?.userId) {
      router.push("/cart");
      setIsOpen(false);
    } else {
      router.push("/auth");
    }
  };

  const handleLogout = async () => {
    if (confirm("Are you sure to log out?")) {
      [];
      await supabase.auth.signOut();
      dispatch(clearSession());
      setIsOpen(false);
      router.push("/");
    }
    return;
  };

  return (
    <div className="block sm:hidden">
      <button onClick={() => setIsOpen(true)}>
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1H11M1 5H11M1 9H11"
            stroke="#141718"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-11/12 max-w-[343px] bg-white shadow-lg transform transition-transform duration-300 z-50 
          p-6
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center">
          <svg
            width="65"
            height="17"
            viewBox="0 0 65 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.10769 3.216C1.17169 2.224 1.55035 1.45067 2.24369 0.896C2.94769 0.341333 3.84369 0.0639992 4.93169 0.0639992C5.67835 0.0639992 6.32369 0.197333 6.86769 0.464C7.41169 0.730666 7.82235 1.09333 8.09969 1.552C8.37702 2.01067 8.51569 2.528 8.51569 3.104C8.51569 3.76533 8.33969 4.33067 7.98769 4.8C7.63569 5.26933 7.21435 5.584 6.72369 5.744V5.808C7.35302 6 7.84369 6.352 8.19569 6.864C8.54769 7.36533 8.72369 8.01067 8.72369 8.8C8.72369 9.42933 8.57969 9.98933 8.29169 10.48C8.00369 10.9707 7.57702 11.36 7.01169 11.648C6.44635 11.9253 5.76902 12.064 4.97969 12.064C3.82769 12.064 2.87835 11.7707 2.13169 11.184C1.39569 10.5867 1.00102 9.73333 0.947688 8.624H2.70769C2.75035 9.18933 2.96902 9.65333 3.36369 10.016C3.75835 10.368 4.29169 10.544 4.96369 10.544C5.61435 10.544 6.11569 10.368 6.46769 10.016C6.81969 9.65333 6.99569 9.18933 6.99569 8.624C6.99569 7.87733 6.75569 7.34933 6.27569 7.04C5.80635 6.72 5.08102 6.56 4.09969 6.56H3.68369V5.056H4.11569C4.97969 5.04533 5.63569 4.90133 6.08369 4.624C6.54235 4.34667 6.77169 3.90933 6.77169 3.312C6.77169 2.8 6.60635 2.39467 6.27569 2.096C5.94502 1.78667 5.47569 1.632 4.86769 1.632C4.27035 1.632 3.80635 1.78667 3.47569 2.096C3.14502 2.39467 2.94769 2.768 2.88369 3.216H1.10769ZM12.7037 0.16V12H10.8797V0.16H12.7037ZM23.1784 7.376C23.1784 7.70667 23.1571 8.00533 23.1144 8.272H16.3784C16.4318 8.976 16.6931 9.54133 17.1624 9.968C17.6318 10.3947 18.2078 10.608 18.8904 10.608C19.8718 10.608 20.5651 10.1973 20.9704 9.376H22.9384C22.6718 10.1867 22.1864 10.8533 21.4824 11.376C20.7891 11.888 19.9251 12.144 18.8904 12.144C18.0478 12.144 17.2904 11.9573 16.6184 11.584C15.9571 11.2 15.4344 10.6667 15.0504 9.984C14.6771 9.29067 14.4904 8.49067 14.4904 7.584C14.4904 6.67733 14.6718 5.88267 15.0344 5.2C15.4078 4.50667 15.9251 3.97333 16.5864 3.6C17.2584 3.22667 18.0264 3.04 18.8904 3.04C19.7224 3.04 20.4638 3.22133 21.1144 3.584C21.7651 3.94667 22.2718 4.45867 22.6344 5.12C22.9971 5.77067 23.1784 6.52267 23.1784 7.376ZM21.2744 6.8C21.2638 6.128 21.0238 5.58933 20.5544 5.184C20.0851 4.77867 19.5038 4.576 18.8104 4.576C18.1811 4.576 17.6424 4.77867 17.1944 5.184C16.7464 5.57867 16.4798 6.11733 16.3944 6.8H21.2744ZM28.5254 3.04C29.2081 3.04 29.8108 3.17867 30.3334 3.456C30.8668 3.72267 31.2828 4.05867 31.5814 4.464V3.184H33.4214V12.144C33.4214 12.9547 33.2508 13.6747 32.9094 14.304C32.5681 14.944 32.0721 15.4453 31.4214 15.808C30.7814 16.1707 30.0134 16.352 29.1174 16.352C27.9228 16.352 26.9308 16.0693 26.1414 15.504C25.3521 14.9493 24.9041 14.192 24.7974 13.232H26.6054C26.7441 13.6907 27.0374 14.0587 27.4854 14.336C27.9441 14.624 28.4881 14.768 29.1174 14.768C29.8534 14.768 30.4454 14.544 30.8934 14.096C31.3521 13.648 31.5814 12.9973 31.5814 12.144V10.672C31.2721 11.088 30.8508 11.44 30.3174 11.728C29.7948 12.0053 29.1974 12.144 28.5254 12.144C27.7574 12.144 27.0534 11.952 26.4134 11.568C25.7841 11.1733 25.2828 10.6293 24.9094 9.936C24.5468 9.232 24.3654 8.43733 24.3654 7.552C24.3654 6.66667 24.5468 5.88267 24.9094 5.2C25.2828 4.51733 25.7841 3.98933 26.4134 3.616C27.0534 3.232 27.7574 3.04 28.5254 3.04ZM31.5814 7.584C31.5814 6.976 31.4534 6.448 31.1974 6C30.9521 5.552 30.6268 5.21067 30.2214 4.976C29.8161 4.74133 29.3788 4.624 28.9094 4.624C28.4401 4.624 28.0028 4.74133 27.5974 4.976C27.1921 5.2 26.8614 5.536 26.6054 5.984C26.3601 6.42133 26.2374 6.944 26.2374 7.552C26.2374 8.16 26.3601 8.69333 26.6054 9.152C26.8614 9.61067 27.1921 9.96267 27.5974 10.208C28.0134 10.4427 28.4508 10.56 28.9094 10.56C29.3788 10.56 29.8161 10.4427 30.2214 10.208C30.6268 9.97333 30.9521 9.632 31.1974 9.184C31.4534 8.72533 31.5814 8.192 31.5814 7.584ZM35.2092 7.552C35.2092 6.66667 35.3905 5.88267 35.7532 5.2C36.1265 4.51733 36.6279 3.98933 37.2572 3.616C37.8972 3.232 38.6012 3.04 39.3692 3.04C40.0625 3.04 40.6652 3.17867 41.1772 3.456C41.6999 3.72267 42.1159 4.05867 42.4252 4.464V3.184H44.2652V12H42.4252V10.688C42.1159 11.104 41.6945 11.4507 41.1612 11.728C40.6279 12.0053 40.0199 12.144 39.3372 12.144C38.5799 12.144 37.8865 11.952 37.2572 11.568C36.6279 11.1733 36.1265 10.6293 35.7532 9.936C35.3905 9.232 35.2092 8.43733 35.2092 7.552ZM42.4252 7.584C42.4252 6.976 42.2972 6.448 42.0412 6C41.7959 5.552 41.4705 5.21067 41.0652 4.976C40.6599 4.74133 40.2225 4.624 39.7532 4.624C39.2839 4.624 38.8465 4.74133 38.4412 4.976C38.0359 5.2 37.7052 5.536 37.4492 5.984C37.2039 6.42133 37.0812 6.944 37.0812 7.552C37.0812 8.16 37.2039 8.69333 37.4492 9.152C37.7052 9.61067 38.0359 9.96267 38.4412 10.208C38.8572 10.4427 39.2945 10.56 39.7532 10.56C40.2225 10.56 40.6599 10.4427 41.0652 10.208C41.4705 9.97333 41.7959 9.632 42.0412 9.184C42.2972 8.72533 42.4252 8.192 42.4252 7.584ZM51.1089 3.04C51.8023 3.04 52.4209 3.184 52.9649 3.472C53.5196 3.76 53.9516 4.18667 54.2609 4.752C54.5703 5.31733 54.7249 6 54.7249 6.8V12H52.9169V7.072C52.9169 6.28267 52.7196 5.68 52.3249 5.264C51.9303 4.83733 51.3916 4.624 50.7089 4.624C50.0263 4.624 49.4823 4.83733 49.0769 5.264C48.6823 5.68 48.4849 6.28267 48.4849 7.072V12H46.6609V3.184H48.4849V4.192C48.7836 3.82933 49.1623 3.54667 49.6209 3.344C50.0903 3.14133 50.5863 3.04 51.1089 3.04ZM59.1796 4.672V9.552C59.1796 9.88267 59.2542 10.1227 59.4036 10.272C59.5636 10.4107 59.8302 10.48 60.2036 10.48H61.3236V12H59.8836C59.0622 12 58.4329 11.808 57.9956 11.424C57.5582 11.04 57.3396 10.416 57.3396 9.552V4.672H56.2996V3.184H57.3396V0.992H59.1796V3.184H61.3236V4.672H59.1796Z"
              fill="black"
            />
            <path
              d="M63.7407 12.112C63.41 12.112 63.1327 12 62.9087 11.776C62.6847 11.552 62.5727 11.2747 62.5727 10.944C62.5727 10.6133 62.6847 10.336 62.9087 10.112C63.1327 9.888 63.41 9.776 63.7407 9.776C64.0607 9.776 64.3327 9.888 64.5567 10.112C64.7807 10.336 64.8927 10.6133 64.8927 10.944C64.8927 11.2747 64.7807 11.552 64.5567 11.776C64.3327 12 64.0607 12.112 63.7407 12.112Z"
              fill="#6C7275"
            />
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              fill="#6C7275"
            />
          </svg>
        </div>

        <div className="relative w-full h-full">
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

          <div className="mt-4 text-buttonXS font-button">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block pt-4 pb-4 text-black border-b border-neutral-3"
            >
              Home
            </Link>

            <button
              onClick={() => setIsShopOpen(!isShopOpen)}
              className="w-full text-left pt-4 pb-4 text-black border-b border-neutral-3 flex justify-between items-center"
            >
              Shop
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7L10 12L15 7"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className={`w-full transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                isShopOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/shop?category=${category}`}
                  onClick={() => {
                    setIsShopOpen(false);
                    setIsOpen(false);
                  }}
                  className="block pt-3 pb-3 text-black  px-4 py-2"
                >
                  {toUppercaseFirstLetters(category)}
                </Link>
              ))}
            </div>

            <Link
              href="/sale"
              onClick={() => setIsOpen(false)}
              className={`block pt-4 pb-4 text-black border-b ${isShopOpen ? "border-t" : ""} border-neutral-3
                `}
            >
              Sale
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setIsOpen(false)}
              className="block pt-4 pb-4 text-black border-b border-neutral-3"
            >
              Contact Us
            </Link>
          </div>

          <div className="absolute w-full bottom-11 mt-6 text-buttonM font-button text-neutral-4">
            <div
              onClick={goToCart}
              className="cursor-pointer flex justify-between items-center py-2
            border-b border-neutral-3"
            >
              <span>Cart</span>
              <div className="relative">
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4L8 5C8 6.65685 9.34315 8 11 8C12.6569 8 14 6.65685 14 5V4"
                    stroke="#141718"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.6115 1H7.38848C5.43313 1 3.76436 2.41365 3.44291 4.3424L1.77624 14.3424C1.36988 16.7805 3.25006 19 5.72182 19H16.2781C18.7499 19 20.6301 16.7805 20.2237 14.3424L18.557 4.3424C18.2356 2.41365 16.5668 1 14.6115 1Z"
                    stroke="#141718"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  2
                </span> */}
              </div>
            </div>

            <div
              onClick={goToUser}
              className="cursor-pointer flex justify-between items-center py-2
            border-b border-neutral-3"
            >
              <span>User</span>
              <div className="relative">
                <svg
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5588 19.0488C16.5654 16.3918 14.0036 14.5 11 14.5C7.99638 14.5 5.4346 16.3918 4.44117 19.0488M17.5588 19.0488C19.6672 17.2154 21 14.5134 21 11.5C21 5.97715 16.5228 1.5 11 1.5C5.47715 1.5 1 5.97715 1 11.5C1 14.5134 2.33285 17.2154 4.44117 19.0488M17.5588 19.0488C15.8031 20.5756 13.5095 21.5 11 21.5C8.49052 21.5 6.19694 20.5756 4.44117 19.0488M14 8.5C14 10.1569 12.6569 11.5 11 11.5C9.34315 11.5 8 10.1569 8 8.5C8 6.84315 9.34315 5.5 11 5.5C12.6569 5.5 14 6.84315 14 8.5Z"
                    stroke="#141718"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <button
              className="w-full mt-6 py-2 bg-black text-white rounded-md
          text-buttonM font-button"
              onClick={userSession?.userId ? async () => handleLogout() : () => router.push("/auth")}
            >
              {userSession?.userId ? "Log out" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-neutral-7 opacity-40 z-40
        ${isOpen ? "block" : "hidden"}`}
      ></div>
    </div>
  );
}
