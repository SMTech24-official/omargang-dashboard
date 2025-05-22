"use client";
import { useCreateUserMutation } from "@/lib/services/userApi";
import { ArrowLeft, ChevronDown, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddUserPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [createUserFunc, { isLoading: updateLoading }] =
    useCreateUserMutation();

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    gender: "",
    role: "",
    phoneNumber: "",
    password: "",
  });

  const handleProfileUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const response: any = await createUserFunc(profileData);
      console.log(profileData);
      console.log(response);
      if (response.data) {
        toast.success("User Created Successfully");
      } else {
        toast.error(response?.error?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8 py-8 px-12 flex min-h-screen">
      <ToastContainer position="bottom-right" />
      <div className="max-w-2xl w-full">
        <div className="flex items-center mb-8">
          <Link href={"/admin/users"}>
            <ArrowLeft className="h-4 w-4 mr-1" />
          </Link>
          <h1 className="text-xl font-medium">Create Shop Owner</h1>
        </div>

        <form className="space-y-6" onSubmit={(e) => handleProfileUpdate(e)}>
          {/* Display Name */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="username"
              defaultValue={profileData?.username}
              type="text"
              placeholder="Enter Full Name"
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  username: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              value={profileData?.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                placeholder="Enter Phone Number"
                value={profileData?.phoneNumber}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    phoneNumber: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      password: e.target.value,
                    })
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <div className="relative">
                <select
                  id="gender"
                  value={profileData.gender}
                  onChange={(e) =>
                    setProfileData({ ...profileData, gender: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Role
              </label>
              <div className="relative">
                <select
                  id="role"
                  value={profileData.role}
                  onChange={(e) =>
                    setProfileData({ ...profileData, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none"
                >
                  <option value="">Select Role</option>
                  <option value="SHOP_OWNER">Shop Owner</option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              {updateLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;
