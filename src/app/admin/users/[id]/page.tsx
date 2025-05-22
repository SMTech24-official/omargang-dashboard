"use client";
import {
  useUserInfoQuery,
  useUserUpdateMutation,
} from "@/lib/services/userApi";
import { ArrowLeft, ChevronDown, Info, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const EditUserPage = () => {
  const params = useParams();
  const userId = params.id;
  const { data: userInfo } = useUserInfoQuery({ userId });
  console.log(userInfo);
  const [updateFunc, { isLoading: updateLoading }] = useUserUpdateMutation();

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    gender: "",
    country: "",
    role: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (userInfo?.result) {
      const user = userInfo.result;
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        gender: user.gender || "",
        country: user.country || "",
        role: user.role || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [userInfo]);

  const handleProfileUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const response: any = await updateFunc({ userId, data: profileData });
      if (response.data) {
        toast.success("User Update Successfully");
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
      <div className="max-w-2xl">
        <div className="flex items-center mb-8">
          <Link href={"/admin/users"}>
            <ArrowLeft className="h-4 w-4 mr-1" />
          </Link>
          <h1 className="text-xl font-medium">User Information</h1>
          <Info className="h-5 w-5 text-gray-400 ml-2" />
        </div>

        <form className="space-y-6" onSubmit={(e) => handleProfileUpdate(e)}>
          {/* Photo Profile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo Profile
            </label>
            <div className="relative inline-block">
              <div className="h-30 w-30 rounded-md overflow-hidden bg-emerald-50">
                <Image
                  src={userInfo?.result?.avater ?? "/"}
                  alt="Avater"
                  width={70}
                  height={70}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          </div>

          {/* Display Name */}
          <div>
            <label
              htmlFor="display-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Display Name
            </label>
            <input
              id="display-name"
              defaultValue={profileData?.username}
              type="text"
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
              readOnly
              id="email"
              type="email"
              value={profileData?.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

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
                setProfileData({ ...profileData, phoneNumber: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <div className="relative">
                <select
                  id="country"
                  value={profileData.country}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      country: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none"
                >
                  <option value="">Select Country</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

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
                Role
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
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SHOP_OWNER">Shop Owner</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bio */}
          {/* <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div> */}

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

export default EditUserPage;
