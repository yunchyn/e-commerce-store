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
  const [userSession, setUserSession] = useState<UserSession>({
    userId: "",
    userName: "",
    profilePic: null,
    email: "",
    cartCount: 0,
  });

  useEffect(() => {
    const fetchUserSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const member = await fetchMemberById(user.id);

      if (!member) return;

      // 장바구니 아이템 개수
      const { count, error } = await supabase
        .from("cart")
        .select("*", { count: "exact", head: true })
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

    fetchUserSession();
  }, []);

  return <SessionContext.Provider value={userSession}>{children}</SessionContext.Provider>;
}
