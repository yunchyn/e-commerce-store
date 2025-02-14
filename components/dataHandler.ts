import { IProduct } from "./product-list/ProductCard";
import { supabase } from "../supabase";
import { IMember } from "@/app/auth/page";
import { IShippingAddress } from "./user/AccountDetail";

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

export interface IUser {
  member_id: string;
  name: string;
  profile_pic?: string;
  email: string;
  created_at: string;
}

export async function fetchMemberById(member_id: string): Promise<IUser | null> {
  const { data, error } = await supabase.from("member").select("*").eq("member_id", member_id).single();

  if (error) {
    console.error("Error fetching member:", error);
    return null;
  }

  return data as IUser;
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

export interface IWishProduct {
  wishlist_id: number;
  member_id: number;
  product_id: number;
  colors: string[];
  name: string;
  price: number;
  sale_price?: number;
  image?: string;
}

export async function fetchWishlistByMemberId(member_id: string): Promise<IWishProduct[] | null> {
  const { data, error } = await supabase
    .from("wishlist")
    .select(
      ` 
      wishlist_id,
      member_id,
      product_id,
      product:product_id (
        name,
        price,
        sale_price,
        image,
        colors
      )
    `
    )
    .eq("member_id", member_id);

  if (error) {
    console.error("Error fetching wishlist:", error);
    return null;
  }

  console.log(data);

  return data.map((wishItem) => {
    const product = Array.isArray(wishItem.product) ? wishItem.product[0] : wishItem.product;

    return {
      ...wishItem,
      ...product,
    };
  });
}

export async function isProductInWishlist(member_id: string, product_id: number): Promise<boolean> {
  const { data, error } = await supabase
    .from("wishlist")
    .select("wishlist_id")
    .eq("member_id", member_id)
    .eq("product_id", product_id)
    .maybeSingle();

  if (error) {
    console.error("Error checking wishlist:", error);
    return false;
  }

  return !!data;
}

export async function getCartCount(member_id: string): Promise<number> {
  const { count, error } = await supabase
    .from("cart")
    .select("cart_id", { count: "exact", head: true })
    .eq("member_id", member_id);

  if (error) {
    console.error("Error fetching cart count:", error);
    return 0;
  }

  return count ?? 0;
}

export async function upsertShippingAddress(memberId: string, addressData: IShippingAddress) {
  // insert 또는 update
  const { data, error } = await supabase.from("shipping_address").upsert(
    [
      {
        member_id: memberId,
        ...addressData,
      },
    ],
    { onConflict: "member_id" }
  );

  if (error) {
    throw new Error(`Failed to save shipping address: ${error.message}`);
  }
  return data;
}

export async function fetchShippingAddressByMemberId(member_id: string): Promise<IShippingAddress | null> {
  const { data, error } = await supabase.from("shipping_address").select("*").eq("member_id", member_id).single();

  if (error) {
    console.error("Error fetching shipping address by member id:", error);
    return null;
  }

  return data as IShippingAddress;
}

export async function updateMember(member_id: string, memberData: Partial<IMember>) {
  const { error } = await supabase.from("member").update(memberData).eq("member_id", member_id);

  if (error) {
    throw new Error("Failed to update member information.");
  }
}
