"use client";
import { useMyProfileQuery } from "@/lib/services/userApi";
import { RefreshCw } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const { data, isLoading } = useMyProfileQuery("");

  return (
    <div className="flex justify-between">
      <h2 className="text-xl font-semibold"></h2>
      <div className="flex items-center gap-2">
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
          <RefreshCw className="h-5 w-5" />
        </button>
        <div className=" h-12 w-12 overflow-hidden rounded-full ">
          {!isLoading ? (
            <Image
              src={data?.result?.userInfo?.avater ?? "/admin.png"}
              alt="Profile"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
