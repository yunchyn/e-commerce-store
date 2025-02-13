"use client";

import { getCartCount } from "@/components/dataHandler";
import { setSession } from "@/store/sessionSlice";
import { supabase } from "@/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export interface IMember {
  name?: string;
  profile_pic?: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [variant, setVariant] = useState<"signIn" | "signUp">("signIn");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "signIn" ? "signUp" : "signIn"));
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IMember>();

  // localStorage에서 저장된 이메일 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setRememberMe(checked);

    if (checked) {
      localStorage.setItem("rememberedEmail", (document.getElementById("email") as HTMLInputElement)?.value || "");
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  };

  // 멤버 테이블에 회원 정보 저장
  async function registerMember({ name, email, password }: IMember) {
    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) {
      console.error("사용자 정보 없음");
      return null;
    }

    const { data: memberData, error: memberError } = await supabase
      .from("member")
      .insert([{ member_id: user.user.id, name, email }])
      .select();

    if (memberError) {
      console.error("Member Insertion Error:", memberError);
      return null;
    }

    return memberData;
  }

  // 회원가입
  const signUpHandler: SubmitHandler<IMember> = async (data) => {
    const { name, email, password } = data;
    console.log(data);
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: name },
        },
      });
      if (signUpError) {
        console.error(signUpError);
        return;
      }

      await registerMember(data);
      console.log(signUpData);
    } catch (error) {
      console.error(error);
      return;
    }

    // 로그인
    signInHandler({ email, password });
  };

  // 로그인
  const signInHandler: SubmitHandler<IMember> = async (data) => {
    const { email, password } = data;
    console.log(data);
    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) console.error(signInError);
      console.log(signInData);

      // Redux에 세션 저장
      const user = signInData.user;
      if (user) {
        const cartCount = await getCartCount(user.id);

        dispatch(
          setSession({
            userId: user.id,
            userName: user.user_metadata?.name || user.email,
            email: user.email || "",
            cartCount,
          })
        );
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex flex-row max-w-[1120px] mx-auto
    max-sm:flex-col"
    >
      <div
        className="relative w-1/2
      max-sm:w-full"
      >
        <Link
          href="/"
          className="absolute w-full flex justify-center pt-6 text-[22px]"
        >
          3legant.
        </Link>
        <img
          src="/img/signup.png"
          alt="signup"
          className="w-full h-screen object-cover
          max-sm:w-screen max-sm:h-auto"
        />
      </div>
      <div
        className="w-1/2 flex justify-center items-center
      max-sm:w-full max-sm:py-10 max-sm:px-8"
      >
        <div className="flex w-[372px] flex-col gap-8 max-w-[456px]">
          <div className="flex flex-col gap gap-6">
            <p className="text-headline4 font-headline">{variant === "signIn" ? "Sign In" : "Sign Up"}</p>
            <p className="text-body2 font-body text-neutral-4">
              {variant === "signIn" ? "Don't have an account yet?" : "Already have an account?"}{" "}
              <span
                onClick={toggleVariant}
                className="text-green font-body-semi text-body2Semi cursor-pointer"
              >
                {variant === "signIn" ? "Sign up" : "Sign in"}
              </span>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(variant === "signUp" ? signUpHandler : signInHandler)}
            className="flex flex-col gap-8"
          >
            {variant === "signUp" && (
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Your name"
                className="text-neutral-4 text-body2 font-body border-b border-neutral-3 pb-2 inline-block outline-none"
              />
            )}
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email address"
              className="text-neutral-4 text-body2 font-body border-b border-neutral-3 pb-2 inline-block outline-none"
            />
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="text-neutral-4 text-body2 font-body border-b border-neutral-3 pb-2 inline-block outline-none"
            />

            {/* 이용약관 or Remember Me */}
            <div
              className="text-body2 font-body text-neutral-4
          flex flex-ro gap-3 items-center"
            >
              {variant === "signUp" ? (
                <>
                  <input
                    type="checkbox"
                    className="w-[18px] h-[18px]"
                  />
                  <div>
                    I agree with <span className="font-body-semi text-neutral-7 cursor-pointer">Privacy Policy</span>{" "}
                    and <span className="font-body-semi text-neutral-7 cursor-pointer">Terms of Use</span>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <input
                    type="checkbox"
                    className="w-[18px] h-[18px]"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  />
                  <span>Remember me</span>
                </>
              )}
            </div>

            <button
              type="submit"
              className="bg-neutral-7 text-white text-buttonS font-button text-center
          px-10 py-2 rounded-lg cursor-pointer"
            >
              {variant === "signUp" ? "Sign Up" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
