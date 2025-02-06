import CartList from "@/components/cart/CartList";

export default async function Cart() {
  return (
    <div
      className="flex flex-col items-center max-w-[1120px] mx-auto my-20
    max-sm:px-8"
    >
      <div
        className="text-headline3 font-headline
      max-sm:text-headline4"
      >
        Cart
      </div>

      <div className="flex flex-row w-full gap-16 mt-20">
        <CartList />
      </div>
    </div>
  );
}
