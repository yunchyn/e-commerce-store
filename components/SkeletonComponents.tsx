export function CartItemSkeleton() {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-center border-b border-neutral-3 py-6 items-center animate-pulse">
      <div className="flex flex-row gap-4">
        <div className="w-20 h-[106px] bg-gray-200 rounded-md"></div>
        <div className="flex flex-col gap-2 justify-center">
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="w-10 h-4 bg-gray-200 rounded mx-auto"></div>
      <div className="w-16 h-4 bg-gray-200 rounded mx-auto"></div>
      <div className="w-16 h-4 bg-gray-200 rounded mx-auto"></div>
    </div>
  );
}

export function ProductInfoSkeleton() {
  return (
    <div className="flex flex-row gap-16 pb-16 border-b border-neutral-3 animate-pulse">
      <div className="w-1/2 max-w-[547px] bg-gray-200 h-[728px] rounded"></div>
      <div className="relative w-1/2 flex flex-col gap-4">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-[44px] w-2/3 bg-gray-200 rounded"></div>
        <div className="h-40 w-full bg-gray-200 rounded"></div>
        <div className="h-[34px] w-1/4 bg-gray-200 rounded"></div>
        <div className="h-12 w-full mt-10 bg-gray-200 rounded"></div>

        {/* 구매란 */}
        <div className="flex flex-col w-full gap-4 absolute bottom-2">
          <div className="w-full h-[45px] flex flex-row gap-6">
            <div className="w-1/4 px-2 grid grid-cols-3 place-items-center bg-gray-200 rounded-lg">
              <div></div>
            </div>
            <div
              className="w-3/4 flex flex-row justify-center items-center gap-2
                      py-[10px] border bg-gray-200 rounded-lg"
            ></div>
          </div>
          <div className="w-full h-[45px] flex justify-center items-center gap-2 bg-gray-200 rounded-lg py-[10px]"></div>
        </div>
      </div>
    </div>
  );
}
