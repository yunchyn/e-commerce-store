import Link from "next/link";
import { ICartProduct } from "./dataHandler";

export default function CartItem({
  product,
  handleRemove,
}: {
  product: ICartProduct;
  handleRemove: (cartId: number) => void;
}) {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-center border-b border-neutral-3 py-6 items-center">
      <Link
        href={`/shop/${product.product_id}`}
        className="flex flex-row gap-4"
      >
        <img
          src={product.image}
          alt="Product Image"
          className="max-w-20"
        />
        <div className="text-left flex flex-col gap-2 justify-center">
          <p className="text-caption1Semi font-caption-semi">{product.name}</p>
          <p className="text-caption2 font-caption text-neutral-4">Color: {product.color}</p>
          <div
            className="text-caption1Semi font-caption-semi text-neutral-4 flex flex-row gap-2 items-center cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (window.confirm("Are you sure you want to remove this item?")) {
                handleRemove(product.cart_id);
              }
            }}
          >
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.292893 0.792893C0.683417 0.402369 1.31658 0.402369 1.70711 0.792893L7 6.08579L12.2929 0.792893C12.6834 0.402369 13.3166 0.402369 13.7071 0.792893C14.0976 1.18342 14.0976 1.81658 13.7071 2.20711L8.41421 7.5L13.7071 12.7929C14.0976 13.1834 14.0976 13.8166 13.7071 14.2071C13.3166 14.5976 12.6834 14.5976 12.2929 14.2071L7 8.91421L1.70711 14.2071C1.31658 14.5976 0.683418 14.5976 0.292893 14.2071C-0.0976309 13.8166 -0.0976309 13.1834 0.292893 12.7929L5.58579 7.5L0.292893 2.20711C-0.0976311 1.81658 -0.0976311 1.18342 0.292893 0.792893Z"
                fill="#6C7275"
              />
            </svg>
            Remove
          </div>
        </div>
      </Link>
      <p>{product.quantity}</p>
      <p className="font-caption text-[18px]">${product.sale_price ?? product.price}</p>
      <p className="font-caption-semi text-[18px]">${product.quantity * (product.sale_price ?? product.price)}</p>
    </div>
  );
}
