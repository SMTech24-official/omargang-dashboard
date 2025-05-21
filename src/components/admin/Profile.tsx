"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Info, ChevronDown, Pencil } from "lucide-react";
import {
  useMyProfileQuery,
  useProfileImageUpdateMutation,
  useProfileUpdateMutation,
} from "@/lib/services/userApi";
import { toast, ToastContainer } from "react-toastify";

export default function Profile() {
  const { data: userInfo } = useMyProfileQuery("");
  const [updateFunc, { isLoading: updateLoading }] = useProfileUpdateMutation();
  const [updateProfileImageFunc, { isLoading: imageUpdateLoading }] =
    useProfileImageUpdateMutation();

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    gender: "",
    country: "",
    role: "",
  });

  useEffect(() => {
    if (userInfo?.result?.userInfo) {
      const user = userInfo.result.userInfo;
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        gender: user.gender || "",
        country: user.country || "",
        role: user.role || "",
      });
    }
  }, [userInfo]);

  const handleProfileUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const response: any = await updateFunc(profileData);
      if (response.data) {
        toast.success("Profile Update Successfully");
      } else {
        toast.error(response?.error?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response: any = await updateProfileImageFunc(formData);
      if ("data" in response) {
        toast.success("Profile image updated successfully!");
      } else {
        toast.error(response?.error?.message || "Image update failed.");
      }
    } catch (error) {
      toast.error("Something went wrong while updating image.");
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ToastContainer position="bottom-right" />
      {/* Sidebar */}
      <div className="w-64  bg-grey-50">
        <nav className="p-4 space-y-1">
          <Link
            href="/admin/settings/basic"
            className="flex items-center justify-between px-4 py-3 text-white bg-emerald-500 rounded-lg"
          >
            <span>Basic</span>
            <ChevronRight className="h-5 w-5" />
          </Link>

          <Link
            href="/admin/settings/account"
            className="flex items-center justify-between px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span>Account</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
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
        <div className="max-w-2xl">
          <div className="flex items-center mb-8">
            <h1 className="text-xl font-medium">Profile Information</h1>
            <Info className="h-5 w-5 text-gray-400 ml-2" />
          </div>

          <form className="space-y-6" onSubmit={(e) => handleProfileUpdate(e)}>
            {/* Photo Profile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo Profile
              </label>
              <div className="relative inline-block">
                <div className="h-16 w-16 rounded-md overflow-hidden bg-emerald-50">
                  <Image
                    src={userInfo?.result?.userInfo?.avater ?? "/admin.png"}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("profileImageInput")?.click()
                  }
                  className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-200"
                >
                  <Pencil className="h-3 w-3 text-gray-500" />
                </button>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
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
                <input
                  readOnly
                  id="role"
                  type="text"
                  value={userInfo?.result?.userInfo?.role}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
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
    </div>
  );
}
