import React from "react";

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import SideMainBar from "@/components/admin/SideMainBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex   ">
      <SideMainBar />
      <div className="w-full min-h-screen  flex flex-col ">
        <Header />
        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
