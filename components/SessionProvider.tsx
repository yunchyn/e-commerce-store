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
  const [loading, setLoading] = useState(true);

  const updateUserSession = async (userId: string) => {
    const member = await fetchMemberById(userId);
    if (!member) return;

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
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setUserSession(undefined);
        setLoading(false);
        return;
      }

      await updateUserSession(data.session.user.id);
      setLoading(false);
    };

    fetchUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        updateUserSession(session.user.id);
      } else {
        setUserSession(undefined);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null; // 로딩 중일 때 빈 화면을 보여줌

  return <SessionContext.Provider value={userSession}>{children}</SessionContext.Provider>;
}
