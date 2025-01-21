import BreadCrumb from "@/components/BreadCrumb";
import ProductInfo from "@/components/ProductInfo";
import ProductReviews from "@/components/ProductReviews";

export default async function ProductDetail({ params }: { params: Promise<{ product_id: number }> }) {
  const productId = (await params).product_id;

  return (
    <div className="flex flex-col max-w-[1120px] mx-auto">
      <BreadCrumb />
      <ProductInfo id={productId} />
      <ProductReviews id={productId} />
    </div>
  );
}
