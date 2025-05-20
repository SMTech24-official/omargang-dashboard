import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample user data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    role: "Store Owner",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Alex Carter",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    role: "Store Owner",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mia Johnson",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    role: "Store Owner",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Liam Evans",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    role: "Store Owner",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "John Doe",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    role: "Store Owner",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Alex Carter",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    role: "Store Owner",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Mia Johnson",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    role: "Store Owner",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "John Doe",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    role: "Store Owner",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 9,
    name: "Mia Johnson",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    role: "Store Owner",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 10,
    name: "John Doe",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    role: "Store Owner",
    image: "/placeholder.svg?height=40&width=40",
  },
];

export default function UserManagement() {
  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Stores/Restaurants List</h2>
        </div>

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
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-100">
                        <Image
                          src={user.image || "/placeholder.svg"}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {user.phone}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {user.role}
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
            <span className="h-8 w-8 flex items-center justify-center">
              ...
            </span>
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
  );
}
