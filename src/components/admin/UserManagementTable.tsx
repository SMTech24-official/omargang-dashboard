import { Delete, Edit, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

interface User {
  id: string;
  name: string;
  phoneNumber: string;
  activePlan: "Yes" | "Paused";
  lastOrder: string;
  image: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Alice Smith",
    phoneNumber: "+1 (555) 987-6543",
    activePlan: "Yes",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "2",
    name: "Bob Johnson",
    phoneNumber: "+1 (555) 234-5678",
    activePlan: "Yes",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "3",
    name: "Charlie Brown",
    phoneNumber: "+1 (555) 876-5432",
    activePlan: "Paused",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "4",
    name: "Diana Miller",
    phoneNumber: "+1 (555) 432-1098",
    activePlan: "Yes",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "5",
    name: "Ethan Davis",
    phoneNumber: "+1 (555) 789-0123",
    activePlan: "Yes",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "6",
    name: "Fiona Green",
    phoneNumber: "+1 (555) 321-0987",
    activePlan: "Paused",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "7",
    name: "George White",
    phoneNumber: "+1 (555) 654-3210",
    activePlan: "Yes",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "8",
    name: "Hannah Black",
    phoneNumber: "+1 (555) 098-7654",
    activePlan: "Yes",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "9",
    name: "Isaac Taylor",
    phoneNumber: "+1 (555) 543-2109",
    activePlan: "Paused",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "10",
    name: "Jack Anderson",
    phoneNumber: "+1 (555) 987-6543",
    activePlan: "Yes",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "11",
    name: "Katherine Martinez",
    phoneNumber: "+1 (555) 234-5678",
    activePlan: "Yes",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "12",
    name: "Liam Rodriguez",
    phoneNumber: "+1 (555) 876-5432",
    activePlan: "Paused",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "13",
    name: "Mia Perez",
    phoneNumber: "+1 (555) 432-1098",
    activePlan: "Yes",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "14",
    name: "Noah Wilson",
    phoneNumber: "+1 (555) 789-0123",
    activePlan: "Yes",
    lastOrder: "24 March 2025",
    image: "",
  },
  {
    id: "15",
    name: "Olivia Garcia",
    phoneNumber: "+1 (555) 321-0987",
    activePlan: "Paused",
    lastOrder: "24 March 2025",
    image: "",
  },
];

const UserManagementTable = () => {
  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        User Management
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
              >
                User Name
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
              >
                Phone Number
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
              >
                Active Plan
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
              >
                Order
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-center text-sm font-medium text-gray-500 w-[15%]"
              >
                User Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap py-2 text-sm text-gray-500 flex gap-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      width={20}
                      height={20}
                      className="h-full w-full object-cover"
                      src={user.image}
                      alt={user.name}
                    />
                  </div>
                  <div className="text-[#3F3D56] font-[500]">{user.name}</div>
                </td>
                <td className="whitespace-nowrap py-3 text-sm text-[#3F3D56] font-[500]">
                  {user.phoneNumber}
                </td>
                <td className="whitespace-nowrap  py-3 text-sm text-[#3F3D56] font-[500]">
                  {user.activePlan}
                </td>
                <td className="whitespace-nowrap  py-3 text-sm text-[#3F3D56] font-[500]">
                  {user.lastOrder}
                </td>
                <td className="whitespace-nowrap  py-3 text-sm text-gray-500 flex justify-center items-center gap-4">
                  <button className="cursor-pointer inline-flex gap-2 items-center justify-center rounded-md border border-gray-300 bg-[#FFF7E8] px-2.5 py-2 text-xs font-medium text-[#63B883] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <Edit size={20} /> Edit
                  </button>
                  <div className="relative inline-block text-left">
                    <div id={`alert-dialog-trigger-${user.id}`}>
                      <button
                        type="button"
                        className="inline-flex gap-1 items-center justify-center rounded-md border border-transparent bg-[#FFEDED] px-2.5 py-2.5 text-xs font-medium text-[#FE4D4F] shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-controls={`alert-dialog-content-${user.id}`}
                        aria-describedby={`alert-dialog-description-${user.id}`}
                      >
                        <Trash size={20} /> Delete User
                      </button>
                    </div>

                    <div
                      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto"
                      id={`alert-dialog-content-${user.id}`}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby={`alert-dialog-title-${user.id}`}
                      style={{ display: "none" }} // Initially hidden, shown via JS
                    >
                      <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        aria-hidden="true"
                      ></div>

                      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <h3
                            className="text-lg font-medium text-gray-900"
                            id={`alert-dialog-title-${user.id}`}
                          >
                            Are you sure?
                          </h3>
                          <button
                            type="button"
                            className="ml-3 inline-flex items-center justify-center rounded-md bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            <span className="sr-only">Close</span>
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.43 4.57a1 1 0 011.41 0L10 8.59l3.16-3.16a1 1 0 111.41 1.41L11.41 10l3.16 3.16a1 1 0 01-1.41 1.41L10 11.41l-3.16 3.16a1 1 0 01-1.41-1.41L8.59 10 5.43 6.84a1 1 0 010-1.41z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>

                        <div
                          className="text-sm text-gray-500"
                          id={`alert-dialog-description-${user.id}`}
                        >
                          <p>
                            This action cannot be undone. This will permanently
                            delete user
                            {user.name}&apos;s account and remove their data
                            from our servers.
                          </p>
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-[#63B88333] px-2.5 py-1.5 text-xs font-medium text-[#63B883] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-[#63B883] focus:ring-offset-2">
          1
        </button>
        <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:bg-[#63B883]">
          2
        </button>
        <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:bg-[#63B883]">
          3
        </button>
        <span className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-gray-500">
          ...
        </span>
        <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:bg-[#63B883]">
          440
        </button>
        <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-[#63B88333] px-2.5 py-1.5 text-xs font-medium text-[#63B883] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserManagementTable;
