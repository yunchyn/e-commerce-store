import { supabase } from "@/supabase";

export const AddToCart = async (productId: number, quantity: number = 1, color?: string) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    alert("Login is required.");
    return;
  }

  const userId = session.user.id;

  // product 테이블에서 colors 가져오기 (color가 없으면 첫 번째 색상 사용)
  if (!color) {
    const { data: product, error: productError } = await supabase
      .from("product")
      .select("colors")
      .eq("product_id", productId)
      .maybeSingle();

    if (productError || !product) {
      console.error("Failed to fetch product:", productError);
      alert("Failed to fetch product details.");
      return;
    }

    color = product.colors?.[0] || null;
  }

  // 현재 장바구니에 같은 productId & color가 존재하는지 확인
  const { data: existingCartItem, error: fetchError } = await supabase
    .from("cart")
    .select("quantity")
    .eq("member_id", userId)
    .eq("product_id", productId)
    .eq("color", color)
    .maybeSingle();

  if (fetchError) {
    console.error("Failed to check the cart:", fetchError);
    alert("Failed to check the cart.");
    return;
  }

  if (existingCartItem) {
    // 같은 productId + color가 존재하면 quantity 증가
    const { error: updateError } = await supabase
      .from("cart")
      .update({ quantity: existingCartItem.quantity + quantity })
      .eq("member_id", userId)
      .eq("product_id", productId)
      .eq("color", color);

    if (updateError) {
      console.error("Failed to update the cart:", updateError);
      alert("Failed to update the cart.");
    } else {
      alert("Quantity increased in the cart.");
    }
  } else {
    // 존재하지 않으면 새로운 튜플 추가
    const insertData: any = {
      member_id: userId,
      product_id: productId,
      quantity,
    };

    if (color) {
      insertData.color = color;
    }

    const { error: insertError } = await supabase.from("cart").insert(insertData);

    if (insertError) {
      console.error("Failed to add to the cart:", insertError);
      alert("Failed to add to the cart.");
    } else {
      alert("Added to the cart.");
    }
  }
};
