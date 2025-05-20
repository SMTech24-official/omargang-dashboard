import { ChevronLeft, ChevronRight, Filter } from "lucide-react"

// Sample order data
const orders = Array.from({ length: 11 }, (_, i) => ({
  id: "#454f5d1fd24124",
  userName: "Alex Carter",
  restaurant: "Spice Avenue",
  status: "Pending", // Default status
}))

export default function OrderManagement() {
  return (
    <div className="container mx-auto p-6  bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <Filter className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Order Id</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">User Name</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Restaurant</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b border-gray-200 last:border-0">
                  <td className="py-4 px-6 text-sm font-medium">{order.id}</td>
                  <td className="py-4 px-6 text-sm">{order.userName}</td>
                  <td className="py-4 px-6 text-sm">{order.restaurant}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Pending</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Completed</span>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs">Cancelled</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center px-6 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-1">
            <button className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button className="h-8 w-8 flex items-center justify-center rounded-full bg-emerald-500 text-white">
              1
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              2
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              3
            </button>
            <span className="h-8 w-8 flex items-center justify-center">...</span>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              440
            </button>

            <button className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
