import { Edit, Trash } from "lucide-react";
import React from "react";

interface User {
  id: string;
  mealName: string;
  type: string;
  calories: number;
  status: string;
}

const meals: User[] = [
  {
    id: "1",
    mealName: "Oatmeal",
    calories: 150,
    status: "In Stock",
    type: "Breakfast",
  },
  {
    id: "2",
    mealName: "Yogurt",
    calories: 100,
    status: "In Stock",
    type: "Breakfast",
  },
  {
    id: "3",
    mealName: "Eggs",
    calories: 200,
    status: "Out of Stock",
    type: "Breakfast",
  },
  {
    id: "4",
    mealName: "Toast",
    calories: 80,
    status: "In Stock",
    type: "Breakfast",
  },
  {
    id: "5",
    mealName: "Cereal",
    calories: 120,
    status: "In Stock",
    type: "Breakfast",
  },
  {
    id: "6",
    mealName: "Pancakes",
    calories: 300,
    status: "Out of Stock",
    type: "Breakfast",
  },
  {
    id: "7",
    mealName: "Waffles",
    calories: 280,
    status: "In Stock",
    type: "Breakfast",
  },
  {
    id: "8",
    mealName: "Fruit Salad",
    calories: 90,
    status: "In Stock",
    type: "Breakfast",
  },
  {
    id: "9",
    mealName: "Smoothie",
    calories: 180,
    status: "In Stock",
    type: "Breakfast",
  },
  {
    id: "10",
    mealName: "Bagel",
    calories: 250,
    status: "Out of Stock",
    type: "Breakfast",
  },
  {
    id: "11",
    mealName: "Muffin",
    calories: 220,
    status: "In Stock",
    type: "Breakfast",
  },
  {
    id: "12",
    mealName: "Granola",
    calories: 160,
    status: "In Stock",
    type: "Breakfast",
  },
  {
    id: "13",
    mealName: "Crepes",
    calories: 270,
    status: "Out of Stock",
    type: "Breakfast",
  },
  {
    id: "14",
    mealName: "French Toast",
    calories: 320,
    status: "In Stock",
    type: "Breakfast",
  },
  {
    id: "15",
    mealName: "Omelette",
    calories: 170,
    status: "In Stock",
    type: "Breakfast",
  },
];

const MealManagementTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="lg:px-2 py-3.5 text-start text-sm font-medium text-gray-500"
            >
              Meal Name
            </th>
            <th
              scope="col"
              className="lg:px-2 py-3.5 text-start text-sm font-medium text-gray-500"
            >
              Type
            </th>
            <th
              scope="col"
              className="lg:px-2 py-3.5 text-start text-sm font-medium text-gray-500"
            >
              Calories
            </th>
            <th
              scope="col"
              className="px-2 py-3.5 text-start text-sm font-medium text-gray-500 w-[15%]"
            >
              Status
            </th>
            <th
              scope="col"
              className="lg:px-2 py-3.5 text-center text-sm font-medium text-gray-500 w-[15%]"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {meals.map((food) => (
            <tr key={food.id}>
              <td className="whitespace-nowrap py-3 text-sm text-[#3F3D56] lg:font-[500]">
                {food.mealName}
              </td>
              <td className="whitespace-nowrap  py-3 text-sm text-[#3F3D56] lg:font-[500]">
                {food.type}
              </td>
              <td className="whitespace-nowrap  py-3 text-sm text-[#3F3D56] lg:font-[500]">
                {food.calories}
              </td>
              <td className="whitespace-nowrap  py-3 text-sm text-[#3F3D56] lg:font-[500]">
                {food.status}
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
                          {food.mealName}&apos;s account and remove their data
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
  );
};

export default MealManagementTable;
