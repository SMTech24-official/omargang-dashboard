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
import { useState } from "react";

export default function Dashboard() {
  const [foodType, setFoodType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading } = useDashboardSummeryQuery("");
  const { data: reportData, isLoading: reportLoading } =
    useSalesReportQuery("");
  const { data: topSelingData, isLoading: topSelingLoading } =
    useTopSellingQuery({ foodType, startDate, endDate });
  const { data: rightData, isLoading: rightDataLoading } =
    useSpecialFoodsQuery("");
  const specialFoods = rightData?.result?.specialFoods;
  const educationResources = rightData?.result?.educationResources;

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFoodType(event.target.value);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <div className="">
      <main className="">
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
                {!rightDataLoading
                  ? specialFoods?.map((food: any) => (
                      <FoodCard
                        key={food.id} // Assuming 'id' is a unique identifier
                        name={food.name}
                        image={food.image}
                        time={food.createdAt}
                        rating={food.avarageRatting}
                        discount={food.discount}
                      />
                    ))
                  : "Loading..."}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
            <div className="col-span-2 rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Top Selling</h3>
                <div className="flex items-center gap-2">
                  <select
                    className="rounded-md border px-2 py-1 text-sm"
                    aria-label="Filter by Food Category"
                    value={foodType}
                    onChange={handleCategoryChange}
                  >
                    <option value="">All Category</option>
                    <option value="FRUIT">Fruit</option>
                    <option value="VEGETABLE">Vegetable</option>
                    <option value="GRAIN">Grain</option>
                    <option value="PROTEIN">Protein</option>
                    <option value="DAIRY">Dairy</option>
                    <option value="FAT_OIL">Fat Oil</option>
                    <option value="SWEET">Sweet</option>
                    <option value="BEVERAGE">Beverage</option>
                    <option value="SNACK">Snack</option>
                    <option value="CONDIMENT">Condiment</option>
                    <option value="HERB_SPICE">Herb Spice</option>
                    <option value="SOUP">Soup</option>
                    <option value="BAKED_GOOD">Baked Good</option>
                    <option value="PREPARED_MEAL">Prepared Meal</option>
                    <option value="LEGUME">Legume</option>
                    <option value="NUT_SEED">Nut Seed</option>
                    <option value="BREAKFAST">Breakfast</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <label htmlFor="startDate" className="text-sm">
                      Start:
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate || ""}
                      onChange={handleStartDateChange}
                      className="rounded-md border px-2 py-1 text-sm"
                    />

                    <label htmlFor="endDate" className="text-sm">
                      End:
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate || ""}
                      onChange={handleEndDateChange}
                      className="rounded-md border px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
              {topSelingLoading ? (
                <p className="text-center">Loading...</p>
              ) : (
                <TopSellingTable topSelingData={topSelingData} />
              )}
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Educational resources</h3>
              </div>
              <div className="space-y-4">
                {!rightDataLoading ? (
                  educationResources?.map((eduResource: any) => (
                    <ResourceCard
                      key={eduResource?.id?.$oid}
                      title={eduResource?.title}
                      description={eduResource?.description}
                      image={eduResource?.image}
                    />
                  ))
                ) : (
                  <div className="flex items-center gap-3">Loading...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
