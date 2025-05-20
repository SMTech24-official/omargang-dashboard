"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart,
  LogOut,
  MessageSquare,
  Settings,
  Star,
  Store,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function SideNav({ isOpen, toggleSidebar }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const router = useRouter();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      route: "/admin/dashboard",
      icon: BarChart,
    },
    {
      id: "stores",
      label: "Stores/Food",
      route: "/admin/store",
      icon: Store,
    },
    {
      id: "users",
      label: "User Management",
      route: "/admin/users",
      icon: User,
    },
    {
      id: "orders",
      label: "Order Management",
      route: "/admin/orders",
      icon: BarChart,
    },
    {
      id: "reviews",
      label: "Reviews Monitoring",
      route: "/admin/reviews",
      icon: Star,
    },
    {
      id: "messages",
      label: "Message",
      route: "/admin/messages",
      icon: MessageSquare,
    },
    {
      id: "settings",
      label: "Settings",
      route: "/admin/settings/account",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/");
  };

  return (
    <div className="w-80 h-screen bg-white flex flex-col justify-between">
      {/* Header Logo */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-green-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bar-chart-2"
            >
              <line x1="18" x2="18" y1="20" y2="10" />
              <line x1="12" x2="12" y1="20" y2="4" />
              <line x1="6" x2="6" y1="20" y2="14" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="mt-6 flex-1">
        <div className="px-4 py-2">
          <p className="text-xs font-semibold uppercase text-gray-500">
            Management
          </p>
        </div>
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.route}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                activeItem === item.id
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setActiveItem(item.id)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Button - Same structure as menu items */}
      <div className="px-2 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
