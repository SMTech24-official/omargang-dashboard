"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import {
  HomeIcon,
  ListOrdered,
  LogOutIcon,
  Menu,
  MenuIcon,
  User2Icon,
  UserIcon,
  X,
} from "lucide-react";
import Cookies from "js-cookie";
import Image from "next/image";
import SidebarLogo from "@/assets/sidebar_logo.png";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { GiMeal } from "react-icons/gi";
import { TbReport } from "react-icons/tb";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const links = [
    { href: "/admin/overview", label: "Dashboard", icon: <HomeIcon /> },
    { href: "/admin/users", label: "User Management", icon: <User2Icon /> },
    {
      href: "/admin/order",
      label: "Order Management",
      icon: <ListOrdered />,
    },
    {
      href: "/admin/food",
      label: "Food Management",
      icon: <PiBowlFoodDuotone size={25} />,
    },
    {
      href: "/admin/meal",
      label: "Meal Management",
      icon: <GiMeal size={25} />,
    },
    { href: "/admin/menu", label: "Menu Planner", icon: <MenuIcon /> },
    {
      href: "/admin/report",
      label: "Customer Report",
      icon: <TbReport size={25} />,
    },
    {
      href: "/admin/profile",
      label: "Profile",
      icon: <UserIcon />,
    },
  ];

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/");
  };

  return (
    <div className="fixed bg-[#FFFFFF] h-full z-40">
      <button
        className="lg:hidden fixed top-5 left-2 z-50 bg-gray-900 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full text-gray-50 flex flex-col p-4 transition-transform duration-300 ease-in-out bg-[#FFFFFF]",
          "lg:w-64 w-58",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
            "lg:translate-x-0 lg:static": true,
          }
        )}
      >
        <div className="lg:text-start lg:ms-0 ms-6">
          <Link href={"/admin/overview"} className="text-2xl font-bold">
            <Image alt="logo" src={SidebarLogo} width={128} />
          </Link>
        </div>
        <hr className="border-1 border-[#E2E8F0]" />
        <nav className="lg:space-y-2 space-y-1 lg:text-2xl text-[14px] mt-6">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "transition-colors lg:p-4 p-3 flex justify-start gap-2 items-center hover:bg-[#6E498B] hover:text-[#FFFFFF] hover:rounded-md",
                pathname.startsWith(href)
                  ? "text-[#FFFFFF] font-[500] text-[14px] bg-[#6E498B] rounded-md"
                  : "text-[#7C8091] font-[500] text-[14px]"
              )}
              onClick={() => setIsOpen(false)}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
        <div
          onClick={handleLogout}
          className="flex gap-2 mt-auto text-start text-[#7C8091] ms-5 cursor-pointer"
        >
          <LogOutIcon />
          Logout
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
