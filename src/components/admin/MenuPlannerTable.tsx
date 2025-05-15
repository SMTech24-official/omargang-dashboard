import React from "react";

interface Menu {
  id: string;
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

const users: Menu[] = [
  {
    id: "1",
    day: "Monday",
    breakfast: "Oatmeal",
    lunch: "Grilled Chicken",
    dinner: "Baked Salmon",
  },
  {
    id: "2",
    day: "Tuesday",
    breakfast: "Yogurt",
    lunch: "Salad",
    dinner: "Steak",
  },
  {
    id: "3",
    day: "Wednesday",
    breakfast: "Eggs",
    lunch: "Pasta",
    dinner: "Chicken Stir-Fry",
  },
  {
    id: "4",
    day: "Thursday",
    breakfast: "Toast",
    lunch: "Soup",
    dinner: "Pizza",
  },
  {
    id: "5",
    day: "Friday",
    breakfast: "Cereal",
    lunch: "Sandwich",
    dinner: "Fish and Chips",
  },
  {
    id: "6",
    day: "Saturday",
    breakfast: "Pancakes",
    lunch: "Burger",
    dinner: "Sushi",
  },
  {
    id: "7",
    day: "Sunday",
    breakfast: "Waffles",
    lunch: "Roast Beef",
    dinner: "Lasagna",
  },
  {
    id: "8",
    day: "Monday",
    breakfast: "Fruit Salad",
    lunch: "Chicken Wrap",
    dinner: "Tacos",
  },
  {
    id: "9",
    day: "Tuesday",
    breakfast: "Smoothie",
    lunch: "Quinoa Bowl",
    dinner: "Curry",
  },
  {
    id: "10",
    day: "Wednesday",
    breakfast: "Bagel",
    lunch: "Sushi Bowl",
    dinner: "Ramen",
  },
  {
    id: "11",
    day: "Thursday",
    breakfast: "Muffin",
    lunch: "Cobb Salad",
    dinner: "BBQ Ribs",
  },
  {
    id: "12",
    day: "Friday",
    breakfast: "Granola",
    lunch: "Tuna Salad",
    dinner: "Paella",
  },
  {
    id: "13",
    day: "Saturday",
    breakfast: "Crepes",
    lunch: "Philly Cheesesteak",
    dinner: "Fajitas",
  },
  {
    id: "14",
    day: "Sunday",
    breakfast: "French Toast",
    lunch: "Caesar Salad",
    dinner: "Roast Chicken",
  },
  {
    id: "15",
    day: "Monday",
    breakfast: "Omelette",
    lunch: "BLT Sandwich",
    dinner: "Shepherd's Pie",
  },
];

const MenuPlannerTable = () => {
  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Weekly Menu Planner
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
              >
                SL
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
              >
                Day
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500 w-[25%]"
              >
                Breakfast
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500 w-[25%]"
              >
                Lunch
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-start text-sm font-medium text-gray-500 w-[10%]"
              >
                Dinner
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap py-4 text-sm text-[#3F3D56] font-[500]">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap py-4 text-sm text-[#3F3D56] font-[500]">
                  {user.day}
                </td>
                <td className="whitespace-nowrap  py-4 text-sm text-[#3F3D56] font-[500]">
                  {user.breakfast}
                </td>
                <td className="whitespace-nowrap  py-4 text-sm text-[#3F3D56] font-[500]">
                  {user.lunch}
                </td>
                <td className="whitespace-nowrap  py-4 text-sm text-[#3F3D56] font-[500]">
                  {user.dinner}
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

export default MenuPlannerTable;
