import { Category, IProduct } from "./ProductCard";
import { supabase } from "../supabase";

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

// id로 튜플 가져오기
export async function fetchProductById(product_id: number): Promise<IProduct | null> {
  const { data, error } = await supabase.from("product").select("*").eq("product_id", product_id).single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data as IProduct;
}
