"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  useStoreDeleteMutation,
  useStoreListsQuery,
} from "@/lib/services/dashboardApi";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function StoreList() {
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const { data: storeLists } = useStoreListsQuery({ page, });
  const [deleteStoreFunc] = useStoreDeleteMutation();

  const handleFoodDelete = async (storeId: string) => {
    setDeletingUserId(storeId);
    try {
      const response: any = await deleteStoreFunc({ storeId });
      console.log(response);
      if (response.data) {
        toast.success("Store Deleted Successfully");
      } else {
        toast.error(response.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div className="rounded-lg shadow-sm overflow-hidden min-h-screen p-4">
      <ToastContainer position="bottom-right" />
      <div className="flex justify-between items-center p-6">
        <h2 className="text-xl font-semibold">Store List</h2>
        <Link
          href="/admin/store/add-store"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add Store
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-b border-gray-200">
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                Location
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                Contact Info
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {storeLists?.result?.data?.map((food: any) => (
              <tr
                key={food?.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-amber-100">
                      <Image
                        src={food?.image}
                        alt={food?.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{food?.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {food?.address}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {food?.contactInfo}
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <Link href={`/admin/store/${food?.id}`}>
                      <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100 transition-colors">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleFoodDelete(food?.id)}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition-colors"
                    >
                      {deletingUserId === food?.id ? "Deleting" : "Delete"}
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
          <span className="h-8 w-8 flex items-center justify-center">...</span>
          <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            {storeLists?.result?.meta?.totalPages}
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
  );
}
