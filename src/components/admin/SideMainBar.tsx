"use client";
import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import Sidebar from "../seller/Sidebar";
import SideNav from "./Sidebar";


const SideMainBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const pathName = usePathname();

  const deviceResponsive = () => {
    let availWidth = window.innerWidth;
    if (availWidth <= 768) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    deviceResponsive();
    window.addEventListener("resize", deviceResponsive);
    return () => {
      window.removeEventListener("resize", deviceResponsive);
    };
  }, []);

  return (
    <div
      className={`  h-full  ${
        pathName == "/privacy-policy" ? "hidden" : "block"
      }`}
    >
     
      <SideNav
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      ></SideNav>

     
    </div>
  );
};

export default SideMainBar;
