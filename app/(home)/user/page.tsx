"use client";

import { SessionContext } from "@/components/SessionProvider";
import WishList from "@/components/user/WishList";
import { toUppercaseFirstLetters } from "@/components/utilities";
import { supabase } from "@/supabase";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function User() {
  const userSession = useContext(SessionContext);
  const searchParams = useSearchParams();
  const router = useRouter();
  const categories: string[] = ["account", "orders", "wishlist", "log out"];
  const category = searchParams.get("category") || "account";

  // 세션 확인
  useEffect(() => {
    if (userSession && !userSession.userId) {
      router.push("/auth");
    }
    console.log("session:", userSession);
  }, [userSession, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // 로그아웃 후 홈으로 이동
  };

  return (
    <div className="max-w-[1120px] mx-auto">
      <div className="py-20 text-headline3 font-headline flex justify-center">My Account</div>
      <div className="flex flex-row gap-2">
        {/* 유저정보 */}
        <div className="w-1/4 flex flex-col items-center bg-neutral-2 py-10">
          <div className="w-20 h-20 bg-neutral-5 rounded-full"></div>
          <div className="pt-1 pb-10 text-body1Semi font-body-semi">
            {userSession?.userName ? `${userSession.userName}` : "ㅤ"}
          </div>

          <div className="flex flex-col gap-4 w-4/5">
            <div className="text-[#807E7E] text-body2Semi font-body-semi flex flex-col gap-3">
              {categories.map((c, index) =>
                c === "log out" ? (
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
                      c === category ? "text-neutral-7 border-neutral-7" : "text-neutral-4 border-transparent"
                    } hover:text-neutral-7`}
                  >
                    {toUppercaseFirstLetters(c)}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
        {/* 카테고리별 섹션 */}
        <WishList userId={userSession?.userId ?? ""} />
      </div>
    </div>
  );
}
