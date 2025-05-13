import CategoryLinks from "@/components/CategoryLinks";
import BannerSlider from "@/components/BannerSlider";
import NewArrivals from "@/components/NewArrivals";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="max-w-[1120px] mx-auto">
          {/* 배너 */}
          <BannerSlider />
          <div className="flex flex-row justify-center items-center pt-8 pb-10">
            <div className="w-3/5 text-headline2">
              Simply Unique<span className="text-neutral-4">/</span> Simply Better.
            </div>
            <div className="w-2/5 text-body2 font-body text-neutral-4">
              <span className=" font-bold text-neutral-5">3legant</span> is a gift & decorations store based in HCMC,
              Vietnam. Est since 2019.
            </div>
          </div>
          <CategoryLinks />

          {/* New Arrivals */}
          <NewArrivals />

          {/* Values 섹션 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-12">
            <div className="flex flex-col gap-4 py-12 px-8 bg-neutral-2 text-headline7 text-neutral-7">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28 38V14M28 38H32M28 38H18M28 14C28 9.58172 24.4183 6 20 6H12C7.58172 6 4 9.58172 4 14V30C4 33.7304 6.55333 36.8645 10.0077 37.7499M28 14H34.4182C35.4344 14 36.4126 14.3868 37.154 15.0819L42.7358 20.3148C43.5424 21.071 44 22.1273 44 23.2329V34C44 36.2091 42.2091 38 40 38M40 38C40 40.2091 38.2091 42 36 42C33.7909 42 32 40.2091 32 38M40 38C40 35.7909 38.2091 34 36 34C33.7909 34 32 35.7909 32 38M18 38C18 40.2091 16.2091 42 14 42C11.7909 42 10 40.2091 10 38C10 37.916 10.0026 37.8326 10.0077 37.7499M18 38C18 35.7909 16.2091 34 14 34C11.8748 34 10.1368 35.6573 10.0077 37.7499"
                  stroke="#141718"
                  strokeWidth="2.5"
                />
                <path
                  d="M20 16H16"
                  stroke="#141718"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 24H12"
                  stroke="#141718"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                Free Shipping
                <div className="pt-2 text-caption1 text-neutral-4">Order above $200</div>
              </div>
            </div>

            <div className="flex flex-col gap-4 py-12 px-8 bg-neutral-2 text-headline7 text-neutral-7">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="8"
                  width="40"
                  height="32"
                  rx="4"
                  stroke="#141718"
                  strokeWidth="2.5"
                />
                <circle
                  cx="4"
                  cy="4"
                  r="4"
                  transform="matrix(1 0 0 -1 20 28)"
                  stroke="#141718"
                  strokeWidth="2.5"
                />
                <circle
                  cx="2"
                  cy="2"
                  r="2"
                  transform="matrix(1 0 0 -1 34 26)"
                  fill="#141718"
                />
                <circle
                  cx="2"
                  cy="2"
                  r="2"
                  transform="matrix(1 0 0 -1 10 26)"
                  fill="#141718"
                />
              </svg>
              <div>
                Money-back
                <div className="pt-2 text-caption1 text-neutral-4">30 days guarantee</div>
              </div>
            </div>

            <div className="flex flex-col gap-4 py-12 px-8 bg-neutral-2 text-headline7 text-neutral-7">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 16H16M32 16C36.4183 16 40 19.5817 40 24V36C40 40.4183 36.4183 44 32 44H16C11.5817 44 8 40.4183 8 36V24C8 19.5817 11.5817 16 16 16M32 16V12C32 7.58172 28.4183 4 24 4C19.5817 4 16 7.58172 16 12V16M24 32V28"
                  stroke="#141718"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                Secure Payments
                <div className="pt-2 text-caption1 text-neutral-4">Secured by Stripe</div>
              </div>
            </div>

            <div className="flex flex-col gap-4 py-12 px-8 bg-neutral-2 text-headline7 text-neutral-7">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42 38V34.7081C42 33.0725 41.0042 31.6017 39.4856 30.9942L35.4173 29.3669C33.4857 28.5943 31.2844 29.4312 30.354 31.292L30 32C30 32 25 31 21 27C17 23 16 18 16 18L16.708 17.646C18.5688 16.7156 19.4057 14.5143 18.6331 12.5827L17.0058 8.51444C16.3983 6.99581 14.9275 6 13.2919 6H10C7.79086 6 6 7.79086 6 10C6 27.6731 20.3269 42 38 42C40.2091 42 42 40.2091 42 38Z"
                  stroke="#141718"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                24/7 Support
                <div className="pt-2 text-caption1 text-neutral-4">Phone and Email support</div>
              </div>
            </div>
          </div>
        </div>

        {/* sale banner */}
        <div className="w-full bg-neutral-2 flex flex-row">
          <img
            src="/img/sale-banner.png"
            alt="banner"
            className="w-1/2 max-h-[532px] object-cover"
          />
          <div className="w-1/2 max-w-[500px] flex flex-col gap-4 justify-center text-headline4 pl-[72px]">
            <p className="text-hairline1 text-blue font-hairline">SALE UP TO 35% OFF</p>
            <div>
              <p>HUNDREDS of</p>
              <p>New lower prices!</p>
            </div>
            <p className="text-body1 font-body">
              It’s more affordable than ever to give every room in your home a stylish makeover
            </p>
            <div className="flex">
              <span className="flex flex-row items-center gap-1 text-buttonS border-b border-neutral-7">
                Shop Now
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.16666 10H15.8333"
                    stroke="#141718"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.8333 15L15.8333 10"
                    stroke="#141718"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.8333 5L15.8333 10"
                    stroke="#141718"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
