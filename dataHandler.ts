import { Category, IProduct } from "./components/ProductCard";
import { supabase } from "./supabase";

// 모든 제품
export async function fetchAllProducts(): Promise<IProduct[]> {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  console.log(data);
  return data as IProduct[];
}

// 신제품
export async function fetchNewProducts(): Promise<IProduct[]> {
  const { data, error } = await supabase.from("products").select("*").eq("is_new", true);
  if (error) {
    console.error("Error fetching new products:", error);
    return [];
  }
  console.log(data);
  return data as IProduct[];
}

export async function fetchProductsByCategory(category: string): Promise<IProduct[]> {
  const { data, error } = await supabase.from("products").select("*").eq("category", category);
  if (error) {
    console.error("Error fetching by category:", error);
    return [];
  }
  console.log(data);
  return data as IProduct[];
}
