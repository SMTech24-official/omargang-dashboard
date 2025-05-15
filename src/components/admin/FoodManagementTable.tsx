import { Delete, Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface User {
  id: string;
  name: string;
  description: string;
  lastOrder: string;
  image: string;
  subtotal: number;
  extras: number;
  total: number;
}

const foods: User[] = [
  {
    id: "1",
    name: "Spicy Chicken Burger",
    description: "Juicy chicken with spicy mayo.",
    subtotal: 8.99,
    lastOrder: "2025-05-01",
    image: "",
    extras: 2,
    total: 10.99,
  },
  {
    id: "2",
    name: "Classic Cheeseburger",
    description: "Beef patty with cheese and veggies.",
    subtotal: 7.99,
    lastOrder: "2025-04-28",
    image: "",
    extras: 3,
    total: 9.99,
  },
  {
    id: "3",
    name: "Vegan Burger",
    description: "Plant-based patty with avocado.",
    subtotal: 9.99,
    lastOrder: "2025-05-02",
    image: "",
    extras: 1,
    total: 11.99,
  },
  {
    id: "4",
    name: "Pepperoni Pizza",
    description: "Classic pizza with pepperoni.",
    subtotal: 12.99,
    lastOrder: "2025-04-29",
    image: "",
    extras: 5,
    total: 14.99,
  },
  {
    id: "5",
    name: "Margherita Pizza",
    description: "Simple pizza with tomato and mozzarella.",
    subtotal: 10.99,
    lastOrder: "2025-05-03",
    image: "",
    extras: 2,
    total: 12.99,
  },
  {
    id: "6",
    name: "Chicken Alfredo Pasta",
    description: "Creamy pasta with grilled chicken.",
    subtotal: 11.99,
    lastOrder: "2025-04-30",
    image: "",
    extras: 4,
    total: 13.99,
  },
  {
    id: "7",
    name: "Salmon Salad",
    description: "Fresh salad with grilled salmon.",
    subtotal: 14.99,
    lastOrder: "2025-05-04",
    image: "",
    extras: 2,
    total: 16.99,
  },
  {
    id: "8",
    name: "Beef Tacos",
    description: "Spicy beef tacos with all the fixings.",
    subtotal: 10.99,
    lastOrder: "2025-05-01",
    image: "",
    extras: 3,
    total: 12.99,
  },
  {
    id: "9",
    name: "Shrimp Scampi",
    description: "Shrimp sautéed in garlic butter sauce.",
    subtotal: 16.99,
    lastOrder: "2025-04-28",
    image: "",
    extras: 1,
    total: 18.99,
  },
  {
    id: "10",
    name: "Mushroom Risotto",
    description: "Creamy risotto with wild mushrooms.",
    subtotal: 13.99,
    lastOrder: "2025-05-02",
    image: "",
    extras: 4,
    total: 15.99,
  },
  {
    id: "11",
    name: "Chicken Caesar Salad",
    description: "Classic Caesar salad with grilled chicken.",
    subtotal: 9.99,
    lastOrder: "2025-04-29",
    image: "",
    extras: 2,
    total: 11.99,
  },
  {
    id: "12",
    name: "BBQ Ribs",
    description: "Slow-cooked ribs with BBQ sauce.",
    subtotal: 17.99,
    lastOrder: "2025-05-03",
    image: "",
    extras: 6,
    total: 19.99,
  },
  {
    id: "13",
    name: "Fish and Chips",
    description: "Crispy battered fish with fries.",
    subtotal: 12.99,
    lastOrder: "2025-04-30",
    image: "",
    extras: 3,
    total: 14.99,
  },
  {
    id: "14",
    name: "Vegetable Curry",
    description: "Spicy vegetable curry with rice.",
    subtotal: 11.99,
    lastOrder: "2025-05-04",
    image: "",
    extras: 1,
    total: 13.99,
  },
  {
    id: "15",
    name: "Steak Fajitas",
    description: "Grilled steak strips with peppers and onions.",
    subtotal: 15.99,
    lastOrder: "2025-05-01",
    image: "",
    extras: 4,
    total: 17.99,
  },
];

const FoodManagementTable = () => {
  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Food List</h2>
        <Link
          href={"/admin/food/add_food"}
          className="bg-[#6E498B] rounded-full py-2 px-4 text-white"
        >
          Add Food
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
              >
                Food Name
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
              >
                Subtotal
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500 w-[10%]"
              >
                Extras
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500 w-[10%]"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-center text-sm font-medium text-gray-500 w-[15%]"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {foods.map((food) => (
              <tr key={food.id}>
                <td className="whitespace-nowrap py-2 text-sm text-gray-500 flex gap-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      width={20}
                      height={20}
                      className="h-full w-full object-cover"
                      src={food.image}
                      alt={food.name}
                    />
                  </div>
                  <div className="font-medium text-gray-900">{food.name}</div>
                </td>
                <td className="whitespace-nowrap py-3 text-sm text-[#3F3D56] font-[500]">
                  {food.description}
                </td>
                <td className="whitespace-nowrap  py-3 text-sm text-[#3F3D56] font-[500]">
                  ${food.subtotal}
                </td>
                <td className="whitespace-nowrap  py-3 text-sm text-[#3F3D56] font-[500]">
                  ${food.extras}
                </td>
                <td className="whitespace-nowrap  py-3 text-sm text-[#3F3D56] font-[500]">
                  ${food.total}
                </td>
                <td className="whitespace-nowrap  py-3 text-sm text-gray-500 flex justify-center items-center lg:gap-4 gap-2">
                  <button className="cursor-pointer inline-flex lg:gap-2 gap-1 items-center justify-center rounded-md border border-gray-300 bg-[#FFF7E8] lg:px-2.5 lg:py-2.5 text-xs lg:font-medium text-[#63B883] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <Edit size={20} /> <p className="hidden lg:flex">Edit</p>
                  </button>
                  <div className="relative inline-block text-left">
                    <div id={`alert-dialog-trigger-${food.id}`}>
                      <button
                        type="button"
                        className="inline-flex gap-1 items-center justify-center rounded-md border border-transparent bg-[#FFEDED] lg:px-2.5 lg:py-2.5  text-xs font-medium text-[#FE4D4F] shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-controls={`alert-dialog-content-${food.id}`}
                        aria-describedby={`alert-dialog-description-${food.id}`}
                      >
                        <Trash size={20} />{" "}
                        <p className="hidden lg:flex">Delete</p>
                      </button>
                    </div>

                    <div
                      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto"
                      id={`alert-dialog-content-${food.id}`}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby={`alert-dialog-title-${food.id}`}
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
                            id={`alert-dialog-title-${food.id}`}
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
                          id={`alert-dialog-description-${food.id}`}
                        >
                          <p>
                            This action cannot be undone. This will permanently
                            delete user
                            {food.name}&apos;s account and remove their data
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

export default FoodManagementTable;
