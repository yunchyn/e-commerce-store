import ProductInfo from "@/components/ProductInfo";

export default async function ProductDetail({ params }: { params: Promise<{ product_id: number }> }) {
  const productId = (await params).product_id;

  return (
    <div className="max-w-[1120px] mx-auto">
      <ProductInfo id={productId} />
    </div>
  );
}
