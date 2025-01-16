"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IMember {
  name?: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [variant, setVariant] = useState<"signIn" | "signUp">("signIn");
  const [rememberMe, setRememberMe] = useState(false);

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

  return (
    <div className="flex flex-row max-w-[1120px] mx-auto">
      <div className="relative w-1/2">
        <p className="absolute w-full flex justify-center pt-6 text-[22px]">3legant.</p>
        <img
          src="/img/signup.png"
          alt="signup"
          className="w-full h-screen object-cover"
        />
      </div>
      <div className="w-1/2 flex justify-center items-center">
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
                  I agree with <span className="font-body-semi text-neutral-7 cursor-pointer">Privacy Policy</span> and{" "}
                  <span className="font-body-semi text-neutral-7 cursor-pointer">Terms of Use</span>
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

          <div
            className="bg-neutral-7 text-white text-buttonS font-button text-center
          px-10 py-2 rounded-lg cursor-pointer"
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}
