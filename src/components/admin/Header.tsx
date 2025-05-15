"use client";
import { useMyProfileQuery } from "@/lib/services/userApi";
import { ChevronDown, SearchIcon } from "lucide-react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const { data, isLoading } = useMyProfileQuery("");
  return (
    <header className="bg-white text-gray-900 border-b border-gray-300 shadow px-6 py-3 flex items-center justify-between">
      <div className="lg:ml-0 ml-10">
        <h1 className="text-xl text-[#7C8091]  font-semibold">Welcome</h1>
        {isLoading ? <p>Loading...</p> : <p>{data?.result?.username}</p>}
      </div>
      <div className="flex lg:gap-5 gap-2">
        <button className="bg-[#FAFAFA] w-10 h-10 rounded-full flex items-center justify-center">
          <SearchIcon size={24} />
        </button>
        {/* <button className="bg-[#FAFAFA] w-10 h-10 rounded-full flex items-center justify-center">
          <BellDot />
        </button> */}
        <div className="bg-[#FAFAFA] px-2 rounded-full flex items-center justify-center lg:gap-2 gap-1">
          {isLoading ? (
            <p>Profile Loading...</p>
          ) : (
            <>
              {data?.result?.profileImage === null ? (
                <CgProfile size={30} />
              ) : (
                <Image
                  alt="profileImage"
                  src={data?.result?.profileImage}
                  height={30}
                  width={30}
                  className="rounded-full"
                />
              )}

              <p>{data?.result?.username}</p>
              <button>
                <ChevronDown />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
