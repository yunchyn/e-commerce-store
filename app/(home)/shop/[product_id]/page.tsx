import BreadCrumb from "@/components/BreadCrumb";
import ProductInfo from "@/components/product-info/ProductInfo";
import ProductReviews from "@/components/product-info/ProductReviews";

export default async function ProductDetail({ params }: { params: Promise<{ product_id: number }> }) {
  const productId = (await params).product_id;

  return (
    <div
      className="flex flex-col max-w-[1120px] mx-auto
    max-sm:px-8"
    >
      <BreadCrumb />
      <ProductInfo id={productId} />
      <ProductReviews id={productId} />
    </div>
  );
}
