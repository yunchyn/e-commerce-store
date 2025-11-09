import { supabase } from '@/supabase';

export const AddToWishlist = async (productId: number) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    alert('Login is required.');
    return;
  }

  const userId = session.user.id;

  // wishlist에 같은 제품이 존재하는지 확인
  const { data: existingWishlistItem, error: fetchError } = await supabase
    .from('wishlist')
    .select('*')
    .eq('member_id', userId)
    .eq('product_id', productId)
    .maybeSingle();

  if (fetchError) {
    console.error('Failed to check the wishlist:', fetchError);
    alert('Failed to check the wishlist.');
    return;
  }

  if (existingWishlistItem) {
    alert('이미 위시리스트에 추가된 상품입니다.');
  } else {
    // 존재하지 않으면 새로운 제품을 wishlist에 추가
    const { error: insertError } = await supabase.from('wishlist').insert({
      member_id: userId,
      product_id: productId,
    });

    if (insertError) {
      console.error('Failed to add to the wishlist:', insertError);
      alert('Failed to add to the wishlist.');
    } else {
      alert('위시리스트에 추가되었습니다.');
    }
  }
};
