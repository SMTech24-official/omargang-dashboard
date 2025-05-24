import React from "react";
import Header from "@/components/admin/Header";
import SideMainBar from "@/components/admin/SideMainBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-screen w-[300px] bg-white shadow">
        <SideMainBar />
      </div>
      <div className="ml-[320px] flex flex-col w-full min-h-screen gap-2">
        <div className="sticky top-0 z-10 bg-white px-4 py-2 shadow-md rounded-md">
          <Header />
        </div>
        <main className="bg-gray-50 rounded-md">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
