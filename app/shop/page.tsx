export default function Shop() {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="flex flex-col justify-center items-center">
            <div className="absolute flex flex-col text-center gap-6">
              <p className="text-buttonXS font-button flex flex-row gap-4 justify-center items-center">
                <span className="text-[#605F5F] flex flex-row justify-center items-center gap-2">
                  Home
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.58423 3L7.58423 6L4.58423 9"
                      stroke="#605F5F"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Shop
              </p>
              <p className="text-headline3 font-headline">Shop page</p>
              <p className="text-body1 font-body">Let’s design the place you always imagined.</p>
            </div>
            <img
              src="/img/shop-banner.png"
              alt="banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
