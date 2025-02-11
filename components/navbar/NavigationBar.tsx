"use client";

import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";
import NotificationBar from "./NotificationBar";
import MobileMenu from "./MobileMenu";
import { useContext } from "react";
import { SessionContext } from "../SessionProvider";

export default function NavigationBar() {
  const userSession = useContext(SessionContext);
  const pathname = usePathname();
  const router = useRouter();

  const isUserLoggedIn = () => {
    if (userSession?.userId) {
      router.push("/user");
    } else {
      router.push("/auth");
    }
  };

  return (
    <>
      <NotificationBar />
      <div className="px-8">
        <div className="relative bg-white w-full h-[60px] flex flex-row justify-center items-center gap-10 max-w-[1120px] mx-auto">
          {/* 로고 */}
          <div className="absolute left-0">
            {/* 데스크탑 로고 */}
            <Link
              href="/"
              className="max-sm:hidden"
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

            {/* 모바일 로고 */}
            <div className="flex flex-row items-center gap-3">
              {/* 메뉴 */}
              <MobileMenu />
              <Link href="/">
                <svg
                  width="65"
                  height="17"
                  viewBox="0 0 65 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden max-sm:block"
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
              </Link>
            </div>
          </div>

          {/* 데스크탑 메뉴 */}
          <div
            className="flex flex-row justify-center items-center gap-10
        max-sm:hidden"
          >
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
              href="/sale"
              className={pathname === "/sale" ? "text-neutral-7" : "text-neutral-4"}
            >
              Sale
            </Link>
            <Link
              href="contact-us"
              className={pathname === "/contact-us" ? "text-neutral-7" : "text-neutral-4"}
            >
              Contact Us
            </Link>
          </div>

          <div className="absolute right-0 flex flex-row gap gap-4">
            {/* 검색 */}
            <div className="max-sm:hidden">
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
            </div>
            {/* 사용자 */}
            <div
              onClick={isUserLoggedIn}
              className="cursor-pointer
              max-sm:hidden"
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

            {/* 장바구니 */}
            <Link
              href="/cart"
              className="flex flex-row gap-1 items-center"
            >
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
              <div
                className={`w-5 h-5 bg-neutral-7 rounded-full
                  text-neutral-1 flex justify-center items-center text-hairline2 font-body-bold
                  ${userSession && userSession.cartCount > 0 ? "block" : "invisible"}`}
              >
                {userSession && userSession.cartCount}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
