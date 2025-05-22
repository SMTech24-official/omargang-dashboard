"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAdminLoginMutation } from "@/lib/services/userApi";
import Image from "next/image";
import LoginImage from "@/assets/logo.png";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdCheckBox } from "react-icons/md";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();

  const [postLogin, { isLoading }] = useAdminLoginMutation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    postLogin(data)
      .unwrap()
      .then((payload) => {
        console.log(payload, "check payloads");
        router.push("/admin/dashboard");
        Cookies.set("accessToken", payload?.result?.accessToken);
      })
      .catch((error: any) => {
        toast.error(error.data.message);
        console.log(error.data.message, "check data");
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <ToastContainer position="bottom-right" />
      <div className="px-8 pt-4 pb-8 bg-white">
        <Image width={101} height={101} src={LoginImage} alt={""} />
      </div>

      <div className="px-8 pt-4 pb-8">
        <div className=" mb-6">
          <h1 className="text-2xl font-bold mb-1">Login</h1>
          <p className="text-[#6C7278] text-sm">
            Let&apos;s login into your account first
          </p>
        </div>

        {/* 🔄 Replace <form> with <div> here */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-gray-500">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              id="email"
              type="email"
              placeholder="yourname@gmail.com"
              className="w-full   h-[50px] border px-4"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-gray-500">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                className="w-full  h-[50px] border px-4"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MdCheckBox id="remember" />
              <label
                htmlFor="remember"
                className=" text-[#6C7278] text-sm font-medium leading-none"
              >
                Remember me
              </label>
            </div>
            <Link
              href="#"
              className="text-sm text-amber-500 hover:text-amber-600"
            >
              Forgot Password
            </Link>
          </div>

          <button
            type="submit"
            className="text-[#FFF] h-[50px] rounded-2xl w-full bg-emerald-500 hover:bg-emerald-600"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 inline mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Login...
              </>
            ) : (
              <>Login</>
            )}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 [text-[#6C7278]">or</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 py-4 px-8 text-center text-xs text-gray-500">
        <p>© 2023 Baraka Dist. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-1">
          <Link href="#" className="text-emerald-500 hover:text-emerald-600">
            Term & Condition
          </Link>
          <span>|</span>
          <Link href="#" className="text-emerald-500 hover:text-emerald-600">
            Privacy Policy
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
