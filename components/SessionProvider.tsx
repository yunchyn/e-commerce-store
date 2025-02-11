"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { fetchMemberById } from "./dataHandler";

interface UserSession {
  userId: string;
  userName: string;
  profilePic: string | null;
  email: string;
  cartCount: number;
}

export const SessionContext = createContext<UserSession | undefined>(undefined);

export default function SessionProvider({ children }: { children: ReactNode }) {
  const [userSession, setUserSession] = useState<UserSession | undefined>(undefined);

  const updateUserSession = async (userId: string) => {
    const member = await fetchMemberById(userId);
    if (!member) return;

    // 장바구니 아이템 개수
    const { count, error } = await supabase
      .from("cart")
      .select("cart_id", { count: "exact", head: true })
      .eq("member_id", member.member_id);

    if (error) {
      console.error("Error fetching cart count:", error);
      return;
    }

    setUserSession({
      userId: member.member_id,
      userName: member.name,
      profilePic: member.profile_pic ?? null,
      email: member.email,
      cartCount: count ?? 0,
    });
  };

  useEffect(() => {
    const fetchUserSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;
      updateUserSession(user.id);
    };

    fetchUserSession();

    // auth 상태 변경 시 세션 업데이트
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        updateUserSession(session.user.id);
      } else {
        setUserSession(undefined); // 로그아웃 시 세션 초기화
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return <SessionContext.Provider value={userSession}>{children}</SessionContext.Provider>;
}
