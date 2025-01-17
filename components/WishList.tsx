export default function WishList() {
  return (
    <div className="px-[72px] w-3/4">
      <div className="flex flex-col gap-10">
        <div className="text-body1Semi font-[32px]">Your Wishlist</div>
        {/* 리스트 */}
        <div
          className="grid grid-cols-3 text-neutral-4 text-caption1 font-caption w-full text-center
        border-b border-neutral-3 pb-2"
        >
          <p>Product</p>
          <p>Price</p>
          <p>Action</p>
        </div>
      </div>
    </div>
  );
}
