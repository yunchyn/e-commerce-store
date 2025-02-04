import { IProduct } from "./product-list/ProductCard";
import { supabase } from "../supabase";
import { IMember } from "@/app/auth/page";

export interface IReview {
  review_id: number;
  member_id: IMember;
  product_id: number;
  rate: number;
  content: string;
}

// 모든 제품
export async function fetchAllProducts(): Promise<IProduct[]> {
  const { data, error } = await supabase.from("product").select("*");
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  console.log(data);
  return data as IProduct[];
}

// 신제품
export async function fetchNewProducts(): Promise<IProduct[]> {
  const { data, error } = await supabase.from("product").select("*").eq("is_new", true);
  if (error) {
    console.error("Error fetching new products:", error);
    return [];
  }
  console.log(data);
  return data as IProduct[];
}

export async function fetchProductsByCategory(category_id: number): Promise<IProduct[]> {
  const { data, error } = await supabase.from("product").select("*").eq("category_id", category_id);
  if (error) {
    console.error("Error fetching by category:", error);
    return [];
  }
  console.log(data);
  return data as IProduct[];
}

// id로 프로덕트 가져오기
export async function fetchProductById(product_id: number): Promise<IProduct | null> {
  const { data, error } = await supabase.from("product").select("*").eq("product_id", product_id).single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data as IProduct;
}

export async function fetchMemberById(member_id: string): Promise<IMember | null> {
  const { data, error } = await supabase.from("member").select("*").eq("member_id", member_id).single();

  if (error) {
    console.error("Error fetching member:", error);
    return null;
  }

  return data as IMember;
}

export interface IReviewWithMember extends IReview {
  member: IMember;
}

export async function fetchReviewsByProduct(product_id: number): Promise<IReview[]> {
  const { data, error } = await supabase
    .from("review")
    .select("*, member_id(name)") // member 테이블에서 name을 가져오기 위해 member_id를 join
    .eq("product_id", product_id);

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data as IReview[];
}

export interface ICartProduct {
  cart_id: number;
  member_id: number;
  product_id: number;
  quantity: number;
  color?: string;
  name: string;
  image?: string;
  price: number;
  sale_price?: number;
}

export async function fetchCartByMemberId(member_id: string): Promise<ICartProduct[] | null> {
  const { data, error } = await supabase
    .from("cart")
    .select(
      `
      cart_id,
      member_id,
      product_id,
      quantity,
      color,
      product:product_id (
        name,
        image,
        price,
        sale_price
      )
    `
    )
    .eq("member_id", member_id);

  if (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
  console.log(data);

  return data.map((cartItem) => {
    const product = Array.isArray(cartItem.product) ? cartItem.product[0] : cartItem.product;

    return {
      ...cartItem,
      ...product,
    };
  });
}
