"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useOrderStatusUpdateMutation,
  useReviewListQuery,
  useReviewStatusUpdateMutation,
} from "@/lib/services/dashboardApi";

// Sample review data
const reviews = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  user: "John Doe",
  restaurant: "Spice Avenue",
  rating: 4.9,
  date: "10-03-2025",
  userImage: "/placeholder.svg?height=40&width=40",
  status: "PENDING",
}));

export default function ReviewsMonitoring() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const { data: orders } = useReviewListQuery({ page, status });
  const handleFilter = async (value: string) => {
    setStatus(value);
  };

  const [reviewUpdate, { isLoading }] = useReviewStatusUpdateMutation();

  return (
    <div className="container mx-auto p-6  bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reviews Monitoring</h1>
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
              value="PENDING"
              className="px-3 py-1  text-green-800 rounded-full text-xs"
            >
              Pending
            </option>
            <option
              value="APPROVED"
              className="px-3 py-1  text-green-800 rounded-full text-xs"
            >
              Approved
            </option>
            <option
              value="HIDE"
              className="px-3 py-1  text-green-800 rounded-full text-xs"
            >
              Hide
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
                  User
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Restaurant
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Rating
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Date
                </th>
                <th className="text-center py-3 px-6 text-sm font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr
                  key={review.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-100">
                        <Image
                          src={review.userImage || "/placeholder.svg"}
                          alt={review.user}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">{review.user}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm">{review.restaurant}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="flex text-amber-400 mr-1">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                      <span className="text-sm">{review.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm">{review.date}</td>
                  <td className="py-4 grid justify-center">
                    <select
                      defaultValue={review?.status}
                      className="text-black-800 border p-1 rounded-md outline-none"
                      onChange={async (e) => {
                        const selectedStatus = e.target.value;

                        try {
                          await reviewUpdate({
                            bookingId: review?.id,
                            data: { status: selectedStatus },
                          });

                          toast.success("Review status updated!");
                        } catch (error) {
                          toast.error("Failed to update review status.");
                          console.error("Status update error:", error);
                        }
                      }}
                      disabled={isLoading}
                    >
                      <option
                        value="PENDING"
                        className="px-3 py-1  text-green-800 rounded-full text-xs"
                      >
                        Pending
                      </option>
                      <option
                        value="APPROVED"
                        className="px-3 py-1  text-green-800 rounded-full text-xs"
                      >
                        Approved
                      </option>
                      <option
                        value="HIDE"
                        className="px-3 py-1  text-green-800 rounded-full text-xs"
                      >
                        Hide
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
