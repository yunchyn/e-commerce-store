import CartList from "@/components/CartList";

export default async function Cart() {
  return (
    <div className="flex flex-col items-center max-w-[1120px] mx-auto my-20">
      <div className="text-headline3 font-headline">Cart</div>

      <div className="flex flex-row w-full gap-16 mt-20">
        <CartList />
      </div>
    </div>
  );
}
