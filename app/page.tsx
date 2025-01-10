import CategoryLinks from "@/components/CategoryLinks";
import ProductCarousel from "@/components/ProductCarousel";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <Slider />
        <div className="flex flex-row justify-center items-center pb-4">
          <div className="w-3/5 text-headline2">
            Simply Unique<span className="text-neutral-4">/</span> Simply Better.
          </div>
          <div className="w-2/5 text-body2 font-body text-neutral-4">
            <span className=" font-bold text-neutral-5">3legant</span> is a gift & decorations store based in HCMC,
            Vietnam. Est since 2019.
          </div>
        </div>
        <CategoryLinks />
        <div className="pt-12">
          <div className="text-headline4">New Arrivals</div>
          <div className="pt-12 pb-12">
            <ProductCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
