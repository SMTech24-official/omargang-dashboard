"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/lib/services/userApi";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

export default function UserManagement() {
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const { data: users } = useGetUsersQuery({ page });
  const [deleteUserFunc] = useDeleteUserMutation();

  const handleDeleteUser = async (userId: string) => {
    setDeletingUserId(userId);
    try {
      const response: any = await deleteUserFunc({ userId });
      if (response.data) {
        toast.success("User deleted successfully");
      } else {
        toast.error(response.error.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <ToastContainer position="bottom-right" />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Management</h2>
        <Link
          href="/admin/users/add-user"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add Shop Owner
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-4">
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
                      <Link href={`/admin/users/${user?.id}`}>
                        <button className="px-3 py-1 bg-amber-50 text-amber-600 rounded text-xs hover:bg-amber-100 transition-colors">
                          View User
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeleteUser(user?.id)}
                        className="px-3 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100 transition-colors"
                      >
                        {deletingUserId === user?.id ? "Deleting" : "Delete"}
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
