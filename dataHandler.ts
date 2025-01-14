import { IProduct } from "./components/ProductCard";
import { supabase } from "./supabase";

export async function fetchAllProducts(): Promise<IProduct[]> {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  console.log(data);
  return data as IProduct[];
}
