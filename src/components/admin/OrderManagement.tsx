"use client";
import {
  useOrderListQuery,
  useOrderStatusUpdateMutation,
} from "@/lib/services/dashboardApi";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function OrderManagement() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const { data: orders } = useOrderListQuery({ page, status });
  const [orderUpdate, { isLoading }] = useOrderStatusUpdateMutation();

  const handleFilter = async (value: string) => {
    setStatus(value);
  };

  return (
    <div className="container mx-auto p-6  bg-gray-50 min-h-screen">
      <ToastContainer position="bottom-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex items-center gap-1">
          <p>Filter by:</p>
          <select
            onChange={(e) => handleFilter(e.target.value)}
            className="text-black-800 border p-1 rounded-md outline-none"
          >
            <option
              value=""
              className="px-3 py-1  text-green-800 rounded-full text-xs"
            >
              Select Status
            </option>
            <option
              value="ORDER_SCHEDULED"
              className="px-3 py-1  text-green-800 rounded-full text-xs"
            >
              Order Scheduled
            </option>
            <option
              value="ORDER_PLANNED"
              className="px-3 py-1  text-green-800 rounded-full text-xs"
            >
              Order Planned
            </option>
            <option
              value="PACKED_READY"
              className="px-3 py-1  text-green-800 rounded-full text-xs"
            >
              Packed & Ready
            </option>
            <option
              value="ORDER_CONFIRMED"
              className="px-3 py-1 text-green-800 rounded-full text-xs"
            >
              Order Confirmed
            </option>
            <option
              value="DRIVER_HEADING"
              className="px-3 py-1  text-green-800 rounded-full text-xs"
            >
              Driver Heading
            </option>
            <option
              value="COMPLETED"
              className="px-3 py-1  text-green-800 rounded-full text-xs"
            >
              Completed
            </option>
            <option
              value="CANCELLED"
              className="px-3 py-1  text-green-800 rounded-full text-xs"
            >
              Canceled
            </option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Order Id
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  User Name
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Restaurant
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Created At
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Updated At
                </th>
                <th className="text-center py-3 px-6 text-sm font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.result?.bookings?.map((order: any) => (
                <tr
                  key={order?.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="py-4 px-6 text-sm font-medium">{order?.id}</td>
                  <td className="py-4 px-6 text-sm">{order?.user?.username}</td>
                  <td className="py-4 px-6 text-sm">{order?.address}</td>
                  <td className="py-4 px-6 text-sm">
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : ""}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {order?.updatedAt
                      ? new Date(order.updatedAt).toLocaleString()
                      : ""}
                  </td>

                  <td className="py-4 grid justify-center">
                    <select
                      defaultValue={order?.status}
                      className="text-black-800 border p-1 rounded-md outline-none"
                      onChange={async (e) => {
                        const selectedStatus = e.target.value;

                        try {
                          const response: any = await orderUpdate({
                            bookingId: order?.id,
                            data: { status: selectedStatus },
                          });

                          if (response.data) {
                            toast.success("Order status updated!");
                          } else {
                            toast.error(response.error.data.message);
                          }
                        } catch (error) {
                          toast.error("Failed to update order status.");
                          console.error("Status update error:", error);
                        }
                      }}
                      disabled={isLoading}
                    >
                      <option
                        value="ORDER_SCHEDULED"
                        className="px-3 py-1  text-green-800 rounded-full text-xs"
                      >
                        Order Scheduled
                      </option>
                      <option
                        value="ORDER_PLANNED"
                        className="px-3 py-1  text-green-800 rounded-full text-xs"
                      >
                        Order Planned
                      </option>
                      <option
                        value="PACKED_READY"
                        className="px-3 py-1  text-green-800 rounded-full text-xs"
                      >
                        Packed & Ready
                      </option>
                      <option
                        value="ORDER_CONFIRMED"
                        className="px-3 py-1 text-green-800 rounded-full text-xs"
                      >
                        Order Confirmed
                      </option>
                      <option
                        value="DRIVER_HEADING"
                        className="px-3 py-1  text-green-800 rounded-full text-xs"
                      >
                        Driver Heading
                      </option>
                      <option
                        value="COMPLETED"
                        className="px-3 py-1  text-green-800 rounded-full text-xs"
                      >
                        Completed
                      </option>
                      <option
                        value="CANCELLED"
                        className="px-3 py-1  text-green-800 rounded-full text-xs"
                      >
                        Canceled
                      </option>
                    </select>
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
              {orders?.result?.meta?.totalPages}
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
