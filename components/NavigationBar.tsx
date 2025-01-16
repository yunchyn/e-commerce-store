"use client";

import { usePathname, useRouter } from "next/navigation";
import NotificationBar from "./NotificationBar";
import Link from "next/link";

export default function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();

  const isUserLoggedIn = () => {
    // 로그인 여부 확인해서 로그인했으면 사용자 페이지, 로그인 하지 않았으면 로그인 페이지로로
    router.push("/user/auth");
  };

  return (
    <>
      <NotificationBar />
      <div className="relative bg-white w-full h-[60px] flex flex-row justify-center items-center gap-10 max-w-[1120px] mx-auto">
        <Link
          href="/"
          className="absolute left-0"
        >
          <svg
            width="105"
            height="27"
            viewBox="0 0 105 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66153 6.824C1.75753 5.336 2.32553 4.176 3.36553 3.344C4.42153 2.512 5.76553 2.096 7.39753 2.096C8.51753 2.096 9.48553 2.296 10.3015 2.696C11.1175 3.096 11.7335 3.64 12.1495 4.328C12.5655 5.016 12.7735 5.792 12.7735 6.656C12.7735 7.648 12.5095 8.496 11.9815 9.2C11.4535 9.904 10.8215 10.376 10.0855 10.616V10.712C11.0295 11 11.7655 11.528 12.2935 12.296C12.8215 13.048 13.0855 14.016 13.0855 15.2C13.0855 16.144 12.8695 16.984 12.4375 17.72C12.0055 18.456 11.3655 19.04 10.5175 19.472C9.66953 19.888 8.65353 20.096 7.46953 20.096C5.74153 20.096 4.31753 19.656 3.19753 18.776C2.09353 17.88 1.50153 16.6 1.42153 14.936H4.06153C4.12553 15.784 4.45353 16.48 5.04553 17.024C5.63753 17.552 6.43753 17.816 7.44553 17.816C8.42153 17.816 9.17353 17.552 9.70153 17.024C10.2295 16.48 10.4935 15.784 10.4935 14.936C10.4935 13.816 10.1335 13.024 9.41353 12.56C8.70953 12.08 7.62153 11.84 6.14953 11.84H5.52553V9.584H6.17353C7.46953 9.568 8.45353 9.352 9.12553 8.936C9.81353 8.52 10.1575 7.864 10.1575 6.968C10.1575 6.2 9.90953 5.592 9.41353 5.144C8.91753 4.68 8.21353 4.448 7.30153 4.448C6.40553 4.448 5.70953 4.68 5.21353 5.144C4.71753 5.592 4.42153 6.152 4.32553 6.824H1.66153ZM19.0555 2.24V20H16.3195V2.24H19.0555ZM34.7677 13.064C34.7677 13.56 34.7357 14.008 34.6717 14.408H24.5677C24.6477 15.464 25.0397 16.312 25.7437 16.952C26.4477 17.592 27.3117 17.912 28.3357 17.912C29.8077 17.912 30.8477 17.296 31.4557 16.064H34.4077C34.0077 17.28 33.2797 18.28 32.2237 19.064C31.1837 19.832 29.8877 20.216 28.3357 20.216C27.0717 20.216 25.9357 19.936 24.9277 19.376C23.9357 18.8 23.1517 18 22.5757 16.976C22.0157 15.936 21.7357 14.736 21.7357 13.376C21.7357 12.016 22.0077 10.824 22.5517 9.8C23.1117 8.76 23.8877 7.96 24.8797 7.4C25.8877 6.84 27.0397 6.56 28.3357 6.56C29.5837 6.56 30.6957 6.832 31.6717 7.376C32.6477 7.92 33.4077 8.688 33.9517 9.68C34.4957 10.656 34.7677 11.784 34.7677 13.064ZM31.9117 12.2C31.8957 11.192 31.5357 10.384 30.8317 9.776C30.1277 9.168 29.2557 8.864 28.2157 8.864C27.2717 8.864 26.4637 9.168 25.7917 9.776C25.1197 10.368 24.7197 11.176 24.5917 12.2H31.9117ZM42.7882 6.56C43.8122 6.56 44.7162 6.768 45.5002 7.184C46.3002 7.584 46.9242 8.088 47.3722 8.696V6.776H50.1322V20.216C50.1322 21.432 49.8762 22.512 49.3642 23.456C48.8522 24.416 48.1082 25.168 47.1322 25.712C46.1722 26.256 45.0202 26.528 43.6762 26.528C41.8842 26.528 40.3962 26.104 39.2122 25.256C38.0282 24.424 37.3562 23.288 37.1962 21.848H39.9082C40.1162 22.536 40.5562 23.088 41.2282 23.504C41.9162 23.936 42.7322 24.152 43.6762 24.152C44.7802 24.152 45.6682 23.816 46.3402 23.144C47.0282 22.472 47.3722 21.496 47.3722 20.216V18.008C46.9082 18.632 46.2762 19.16 45.4762 19.592C44.6922 20.008 43.7962 20.216 42.7882 20.216C41.6362 20.216 40.5802 19.928 39.6202 19.352C38.6762 18.76 37.9242 17.944 37.3642 16.904C36.8202 15.848 36.5482 14.656 36.5482 13.328C36.5482 12 36.8202 10.824 37.3642 9.8C37.9242 8.776 38.6762 7.984 39.6202 7.424C40.5802 6.848 41.6362 6.56 42.7882 6.56ZM47.3722 13.376C47.3722 12.464 47.1802 11.672 46.7962 11C46.4282 10.328 45.9402 9.816 45.3322 9.464C44.7242 9.112 44.0682 8.936 43.3642 8.936C42.6602 8.936 42.0042 9.112 41.3962 9.464C40.7882 9.8 40.2922 10.304 39.9082 10.976C39.5402 11.632 39.3562 12.416 39.3562 13.328C39.3562 14.24 39.5402 15.04 39.9082 15.728C40.2922 16.416 40.7882 16.944 41.3962 17.312C42.0202 17.664 42.6762 17.84 43.3642 17.84C44.0682 17.84 44.7242 17.664 45.3322 17.312C45.9402 16.96 46.4282 16.448 46.7962 15.776C47.1802 15.088 47.3722 14.288 47.3722 13.376ZM52.8138 13.328C52.8138 12 53.0858 10.824 53.6298 9.8C54.1898 8.776 54.9418 7.984 55.8858 7.424C56.8458 6.848 57.9018 6.56 59.0538 6.56C60.0938 6.56 60.9978 6.768 61.7658 7.184C62.5498 7.584 63.1738 8.088 63.6378 8.696V6.776H66.3978V20H63.6378V18.032C63.1738 18.656 62.5418 19.176 61.7418 19.592C60.9418 20.008 60.0298 20.216 59.0058 20.216C57.8698 20.216 56.8298 19.928 55.8858 19.352C54.9418 18.76 54.1898 17.944 53.6298 16.904C53.0858 15.848 52.8138 14.656 52.8138 13.328ZM63.6378 13.376C63.6378 12.464 63.4458 11.672 63.0618 11C62.6938 10.328 62.2058 9.816 61.5978 9.464C60.9898 9.112 60.3338 8.936 59.6298 8.936C58.9258 8.936 58.2698 9.112 57.6618 9.464C57.0538 9.8 56.5578 10.304 56.1738 10.976C55.8058 11.632 55.6218 12.416 55.6218 13.328C55.6218 14.24 55.8058 15.04 56.1738 15.728C56.5578 16.416 57.0538 16.944 57.6618 17.312C58.2858 17.664 58.9418 17.84 59.6298 17.84C60.3338 17.84 60.9898 17.664 61.5978 17.312C62.2058 16.96 62.6938 16.448 63.0618 15.776C63.4458 15.088 63.6378 14.288 63.6378 13.376ZM76.6634 6.56C77.7034 6.56 78.6314 6.776 79.4474 7.208C80.2794 7.64 80.9274 8.28 81.3914 9.128C81.8554 9.976 82.0874 11 82.0874 12.2V20H79.3754V12.608C79.3754 11.424 79.0794 10.52 78.4874 9.896C77.8954 9.256 77.0874 8.936 76.0634 8.936C75.0394 8.936 74.2234 9.256 73.6154 9.896C73.0234 10.52 72.7274 11.424 72.7274 12.608V20H69.9914V6.776H72.7274V8.288C73.1754 7.744 73.7434 7.32 74.4314 7.016C75.1354 6.712 75.8794 6.56 76.6634 6.56ZM88.7693 9.008V16.328C88.7693 16.824 88.8813 17.184 89.1053 17.408C89.3453 17.616 89.7453 17.72 90.3053 17.72H91.9853V20H89.8253C88.5933 20 87.6493 19.712 86.9933 19.136C86.3373 18.56 86.0093 17.624 86.0093 16.328V9.008H84.4493V6.776H86.0093V3.488H88.7693V6.776H91.9853V9.008H88.7693Z"
              fill="black"
            />
            <path
              d="M95.611 20.168C95.115 20.168 94.699 20 94.363 19.664C94.027 19.328 93.859 18.912 93.859 18.416C93.859 17.92 94.027 17.504 94.363 17.168C94.699 16.832 95.115 16.664 95.611 16.664C96.091 16.664 96.499 16.832 96.835 17.168C97.171 17.504 97.339 17.92 97.339 18.416C97.339 18.912 97.171 19.328 96.835 19.664C96.499 20 96.091 20.168 95.611 20.168Z"
              fill="#6C7275"
            />
          </svg>
        </Link>
        <Link
          href="/"
          className={pathname === "/" ? "text-neutral-7" : "text-neutral-4"}
        >
          Home
        </Link>
        <Link
          href="/shop"
          className={pathname === "/shop" ? "text-neutral-7" : "text-neutral-4"}
        >
          Shop
        </Link>
        <Link
          href="/product"
          className={pathname === "/product" ? "text-neutral-7" : "text-neutral-4"}
        >
          Product
        </Link>
        <Link
          href="contact-us"
          className={pathname === "/contact-us" ? "text-neutral-7" : "text-neutral-4"}
        >
          Contact Us
        </Link>
        <div className="absolute right-0 flex flex-row gap gap-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5 18.5L22 22M21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21C16.7467 21 21 16.7467 21 11.5Z"
              stroke="#141718"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            onClick={isUserLoggedIn}
            className="cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5588 19.5488C17.5654 16.8918 15.0036 15 12 15C8.99638 15 6.4346 16.8918 5.44117 19.5488M18.5588 19.5488C20.6672 17.7154 22 15.0134 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.0134 3.33285 17.7154 5.44117 19.5488M18.5588 19.5488C16.8031 21.0756 14.5095 22 12 22C9.49052 22 7.19694 21.0756 5.44117 19.5488M15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z"
                stroke="#141718"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 6L9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7V6"
              stroke="#141718"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.6115 3H8.38851C6.43316 3 4.7644 4.41365 4.44294 6.3424L2.77627 16.3424C2.36992 18.7805 4.25009 21 6.72185 21H17.2782C19.7499 21 21.6301 18.7805 21.2237 16.3424L19.5571 6.3424C19.2356 4.41365 17.5669 3 15.6115 3Z"
              stroke="#141718"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
