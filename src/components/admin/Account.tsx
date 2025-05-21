"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ChevronRight, Eye, EyeOff, Info } from "lucide-react";
import { useChangePasswordMutation } from "@/lib/services/userApi";
import { toast, ToastContainer } from "react-toastify";

type FormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function AccountPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePasswordFunc, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data: FormData) => {
    const submitData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    try {
      const response: any = await changePasswordFunc(submitData);
      if (response.data) {
        toast.success("Password has been changed successfully");
      } else {
        toast.error(response.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ToastContainer position="bottom-right" />
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-gray-50">
        <nav className="p-4 space-y-1">
          <Link
            href="/admin/settings/basic"
            className="flex items-center justify-between px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span>Basic</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link
            href="/admin/settings/account"
            className="flex items-center justify-between px-4 py-3 text-white bg-emerald-500 rounded-lg"
          >
            <span>Account</span>
            <ChevronRight className="h-5 w-5" />
          </Link>

          <Link
            href="/admin/settings/notifications"
            className="flex items-center justify-between px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span>Notifications</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-md">
          <div className="flex items-center mb-8">
            <h1 className="text-xl font-medium">Password</h1>
            <Info className="h-5 w-5 text-gray-400 ml-2" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Old Password */}
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Old Password
              </label>
              <div className="relative">
                <input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Input your old password"
                  {...register("oldPassword", {
                    required: "Old password is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Input your new password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters required",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  {...register("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Passwords do not match",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
