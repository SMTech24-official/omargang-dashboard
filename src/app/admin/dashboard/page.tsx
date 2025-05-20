import FoodCard from "@/components/admin/food-cart";
import ResourceCard from "@/components/admin/resource-cart";
import SalesChart from "@/components/admin/sales-chart";

import StatCard from "@/components/admin/stat-cart";
import TopSellingTable from "@/components/admin/top-selling";
import { BarChart, Users } from "lucide-react";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div className=" bg-gray-50">
      <main className=" w-full">
        {/* <div className="p-4">
          <h1 className="text-xl font-medium text-gray-500">Dashboard</h1>
        </div> */}
        <div className="">
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Stores/Restaurants"
              value="287,612"
              icon={<Users className="h-5 w-5 text-orange-500" />}
              iconBg="bg-orange-100"
            />
            <StatCard
              title="Active Order"
              value="1200"
              icon={<BarChart className="h-5 w-5 text-green-500" />}
              iconBg="bg-green-100"
            />
            <StatCard
              title="Total Orders"
              value="6,816"
              icon={<BarChart className="h-5 w-5 text-green-500" />}
              iconBg="bg-green-100"
            />
            <StatCard
              title="Total Earning"
              value="$26,816"
              icon={<BarChart className="h-5 w-5 text-teal-500" />}
              iconBg="bg-teal-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
            <div className="col-span-2 rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Sales Report</h3>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-500">Revenue</span>
                  </span>
                  <select className="rounded-md border px-2 py-1 text-sm">
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                  </select>
                </div>
              </div>
              <SalesChart />
              {/* <div className="mt-4 rounded-md bg-gray-50 p-3">
                <div className="text-sm text-gray-500">August</div>
                <div className="text-lg font-semibold">44,058.00</div>
                <div className="flex items-center gap-1 text-sm">
                  <span>Total Sales</span>
                  <span className="text-green-500">+47%</span>
                </div>
              </div> */}
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Special Food</h3>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                <FoodCard
                  name="Vegetarian Noodle"
                  image="/placeholder.svg?height=60&width=60"
                  price="800 ₹"
                  time="10 min"
                  rating={4.9}
                  discount="10% OFF"
                />
                <FoodCard
                  name="Vegetarian Noodle"
                  image="/placeholder.svg?height=60&width=60"
                  price="800 ₹"
                  time="10 min"
                  rating={4.9}
                  discount="10% OFF"
                />
                <FoodCard
                  name="Vegetarian Noodle"
                  image="/placeholder.svg?height=60&width=60"
                  price="800 ₹"
                  time="10 min"
                  rating={4.9}
                  discount="10% OFF"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
            <div className="col-span-2 rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Top Selling</h3>
                <div className="flex items-center gap-2">
                  <select className="rounded-md border px-2 py-1 text-sm">
                    <option>All Category</option>
                  </select>
                  <button className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm">
                    <span>August 2024</span>
                    <span className="text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-calendar"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                    </span>
                  </button>
                  <button className="text-sm text-gray-500">See More</button>
                </div>
              </div>
              <TopSellingTable />
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Educational resources</h3>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                <ResourceCard
                  title="Mixed Salad Bomb"
                  description="Colorful, tasty, healthy, unique blend."
                  image="/placeholder.svg?height=60&width=60"
                />
                <ResourceCard
                  title="Mixed Salad Bomb"
                  description="Colorful, tasty, healthy, unique blend."
                  image="/placeholder.svg?height=60&width=60"
                />
                <ResourceCard
                  title="Mixed Salad Bomb"
                  description="Colorful, tasty, healthy, unique blend."
                  image="/placeholder.svg?height=60&width=60"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
