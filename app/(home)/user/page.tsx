'use client';

import { MenuType, MobileDropdown } from '@/components/product-list/ShopCategoryDropdown';
import AccountDetail from '@/components/user/AccountDetail';
import UserOrders from '@/components/user/UserOrders';
import WishList from '@/components/user/WishList';
import { toUppercaseFirstLetters } from '@/components/utilities';
import { clearSession } from '@/store/sessionSlice';
import { RootState } from '@/store/store';
import { supabase } from '@/supabase';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function User() {
  const userSession = useSelector((state: RootState) => state.session);
  const searchParams = useSearchParams();
  const router = useRouter();
  const categories: string[] = ['account', 'orders', 'wishlist', 'log out'];
  const mobileCategories: string[] = ['account', 'orders', 'wishlist'];
  const selectedCategory = toUppercaseFirstLetters(searchParams.get('category') || 'account');
  const [isOpenDropdown, setIsOpenDropdown] = useState<MenuType | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // 로그아웃 중일때는 바로 "/"로 push되게 하기 위함
  const dispatch = useDispatch();

  // 세션 확인
  useEffect(() => {
    if (isLoggingOut || !userSession) return;

    if (!userSession.userId) {
      alert('로그인이 필요합니다.');
      router.push('/auth');
      return;
    }
    console.log('session:', userSession);
  }, [userSession, isLoggingOut]);

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      setIsLoggingOut(true);
      await supabase.auth.signOut();
      dispatch(clearSession());
      router.push('/');
    }
    return;
  };

  const goBack = () => {
    router.back();
  };

  const CategorySection = useMemo(() => {
    switch (selectedCategory) {
      case 'Orders':
        return <UserOrders />;
      case 'Wishlist':
        return <WishList userId={userSession!.userId} />;
      default:
        return <AccountDetail userSession={userSession} />;
    }
  }, [selectedCategory, userSession]);

  return (
    <div
      className="max-w-[1120px] mx-auto mb-20
    max-sm:px-8"
    >
      <div className="hidden max-sm:block">
        <div className="py-4 flex flex-row items-center text-buttonXS font-button text-neutral-4 gap-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.41602 9L4.41602 6L7.41602 3"
              stroke="#605F5F"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button onClick={goBack}>Back</button>
        </div>
      </div>
      <div
        className="py-20 text-headline3 font-headline flex justify-center
      max-sm:text-headline4"
      >
        My Account
      </div>
      <div
        className="flex flex-row gap-2
      max-sm:flex-col"
      >
        {/* 유저정보 */}
        <div
          className="w-1/4 h-[500px] flex flex-col items-center bg-neutral-2 py-10
        max-sm:w-full max-sm:h-auto max-sm:pt-10 max-sm:pb-5"
        >
          <div className="w-20 h-20 bg-neutral-5 rounded-full"></div>
          <div className="pt-1 pb-10 text-body1Semi font-body-semi">
            {userSession?.userName ? `${userSession.userName}` : 'ㅤ'}
          </div>

          {/* 데스크탑 메뉴 */}
          <div
            className="flex flex-col gap-4 w-4/5
          max-sm:hidden"
          >
            <div className="text-[#807E7E] text-body2Semi font-body-semi flex flex-col gap-3">
              {categories.map((c, index) =>
                c === 'log out' ? (
                  <button
                    key={index}
                    onClick={handleLogout}
                    className="py-2 border-b text-neutral-4 border-transparent hover:text-neutral-7 
                    w-full text-left"
                  >
                    {toUppercaseFirstLetters(c)}
                  </button>
                ) : (
                  <Link
                    key={index}
                    href={`/user?category=${c}`}
                    className={`py-2 border-b ${
                      toUppercaseFirstLetters(c) === selectedCategory
                        ? 'text-neutral-7 border-neutral-7'
                        : 'text-neutral-4 border-transparent'
                    } hover:text-neutral-7`}
                  >
                    {toUppercaseFirstLetters(c)}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* 모바일 메뉴 */}
          <div
            className="hidden
          max-sm:w-full max-sm:px-4 max-sm:block"
          >
            <MobileDropdown
              items={mobileCategories}
              selectedValue={selectedCategory}
              type="user"
              isOpen={isOpenDropdown === 'category'}
              setIsOpenDropdown={() => setIsOpenDropdown(isOpenDropdown === 'category' ? null : 'category')}
            />
            <div className="pt-4 flex justify-center">
              <button
                className="text-buttonS font-button
              text-neutral-4 hover:text-neutral-7"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
        {/* 카테고리별 섹션 */}
        <div
          className="px-[72px] w-3/4
        max-sm:px-0 max-sm:w-full max-sm:pt-10"
        >
          {CategorySection}
        </div>
      </div>
    </div>
  );
}
