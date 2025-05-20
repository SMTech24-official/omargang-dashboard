import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";

export default function FoodList() {
  return (
    <div className=" w-full h-screen bg-gray-50">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Stories/Foods</p>
              <h2 className="text-3xl font-bold mt-1">1524</h2>
            </div>
            <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center">
              <FileText className="h-4 w-4 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Active Orders</p>
              <h2 className="text-3xl font-bold mt-1">2025</h2>
            </div>
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Reject Orders</p>
              <h2 className="text-3xl font-bold mt-1 text-red-500">65</h2>
            </div>
            <div className="w-8 h-8 bg-cyan-50 rounded-full flex items-center justify-center">
              <LayoutGrid className="h-4 w-4 text-cyan-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Food List Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6">
          <h2 className="text-xl font-semibold">Stores/Food List</h2>
          <Link
            href="/admin/addFood"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Add Food
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
              {Array.from({ length: 8 }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-amber-100">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Food"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">
                        Vegetarian Noodle Big Food
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    100 Test Blvd, Dummyville, FL
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    +1 (555) 123-4567
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100 transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
          <button className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex space-x-1">
            <button className="h-8 w-8 flex items-center justify-center rounded-full bg-emerald-500 text-white">
              1
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              2
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              3
            </button>
            <span className="h-8 w-8 flex items-center justify-center">
              ...
            </span>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              440
            </button>
          </div>

          <button className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
