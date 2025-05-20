"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetUsersQuery } from "@/lib/services/userApi";
import { useState } from "react";

export default function UserManagement() {
  const [page, setPage] = useState(1);
  const { data: users } = useGetUsersQuery({ page });

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Name
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Contact Info
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Role
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.result?.users.map((user: any) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-100">
                        <Image
                          src={user?.avater || "/placeholder.svg"}
                          alt={user?.username}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">{user?.username}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {user?.email}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {user?.phoneNumber}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {user?.role}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-amber-50 text-amber-600 rounded text-xs hover:bg-amber-100 transition-colors">
                        View User
                      </button>
                      <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100 transition-colors">
                        Delete User
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center px-6 py-4 border-t border-gray-200 gap-4">
          <button
            onClick={() => setPage(page - 1)}
            className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex space-x-1">
            <button
              className={`h-8 w-8 flex items-center justify-center rounded-full bg-emerald-500 text-white`}
            >
              {page}
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              {page + 1}
            </button>
            <button
              onClick={() => setPage(page + 2)}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              {page + 2}
            </button>
            <span className="h-8 w-8 flex items-center justify-center">
              ...
            </span>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              {users?.result?.mate?.totalPages}
            </button>
          </div>

          <button
            onClick={() => setPage(page + 1)}
            className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
