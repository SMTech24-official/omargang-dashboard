import Image from "next/image"
import { ChevronLeft, ChevronRight, Filter, Star } from 'lucide-react'

// Sample review data
const reviews = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  user: "John Doe",
  restaurant: "Spice Avenue",
  rating: 4.9,
  date: "10-03-2025",
  userImage: "/placeholder.svg?height=40&width=40",
}))

export default function ReviewsMonitoring() {
  return (
    <div className="container mx-auto p-6  bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reviews Monitoring</h1>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <Filter className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">User</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Restaurant</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Rating</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-b border-gray-200 last:border-0">
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
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs hover:bg-green-200 transition-colors">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs hover:bg-amber-200 transition-colors">
                        Hide
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs hover:bg-red-200 transition-colors">
                        Flag
                      </button>
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
