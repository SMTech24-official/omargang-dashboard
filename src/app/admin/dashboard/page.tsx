"use client";
import FoodCard from "@/components/admin/food-cart";
import ResourceCard from "@/components/admin/resource-cart";
import RechartsBarChart from "@/components/admin/SalesReportChart";
import SalesChart from "@/components/admin/SalesReportChart";

import StatCard from "@/components/admin/stat-cart";
import TopSellingTable from "@/components/admin/top-selling";
import {
  useDashboardSummeryQuery,
  useSalesReportQuery,
  useSpecialFoodsQuery,
  useTopSellingQuery,
} from "@/lib/services/dashboardApi";
import { BarChart, Users } from "lucide-react";

export default function Dashboard() {
  const { data, isLoading } = useDashboardSummeryQuery("");
  const { data: reportData, isLoading: reportLoading } =
    useSalesReportQuery("");
  const { data: topSelingData, isLoading: topSelingLoading } =
    useTopSellingQuery("");
  console.log(topSelingData);
  const { data: rightData, isLoading: rightDataLoading } =
    useSpecialFoodsQuery("");
  const specialFoods = rightData?.result?.specialFoods;
  const educationResources = rightData?.result?.educationResources;

  return (
    <div className=" bg-gray-50">
      <main className="w-full">
        <div className="">
          <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-5">
            <StatCard
              title="Total Restaurants"
              value={data?.result?.totalRestaurants}
              icon={<Users className="h-5 w-5 text-orange-500" />}
              iconBg="bg-orange-100"
            />
            <StatCard
              title="Total Foods"
              value={data?.result?.totalFood}
              icon={<Users className="h-5 w-5 text-orange-500" />}
              iconBg="bg-orange-100"
            />
            <StatCard
              title="Active Order"
              value={data?.result?.activeBooking}
              icon={<BarChart className="h-5 w-5 text-green-500" />}
              iconBg="bg-green-100"
            />
            <StatCard
              title="Total Orders"
              value={data?.result?.totalBooking}
              icon={<BarChart className="h-5 w-5 text-green-500" />}
              iconBg="bg-green-100"
            />
            <StatCard
              title="Total Earning"
              value={data?.result?.totalEarning}
              icon={<BarChart className="h-5 w-5 text-teal-500" />}
              iconBg="bg-teal-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
            <div className="col-span-2 rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2"></div>
              </div>
              <RechartsBarChart salesReport={reportData} />
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm ">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Special Food</h3>
              </div>

              <div className="space-y-4 ">
                {specialFoods?.map((food: any) => (
                  <FoodCard
                    key={food.id} // Assuming 'id' is a unique identifier
                    name={food.name}
                    image={food.image}
                    time={food.createdAt}
                    rating={food.avarageRatting}
                    discount={food.discount}
                  />
                ))}
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
                    <option>All Category</option>
                    <option>All Category</option>
                  </select>
                  <button className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm">
                    <input type="date" />
                  </button>
                </div>
              </div>
              <TopSellingTable />
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Educational resources</h3>
              </div>
              <div className="space-y-4">
                {educationResources?.map((eduResource: any) => (
                  <ResourceCard
                    key={eduResource?.id?.$oid}
                    title={eduResource?.title}
                    description={eduResource?.description}
                    image={eduResource?.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
