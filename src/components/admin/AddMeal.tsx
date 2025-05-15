"use client";
import { useProfileUpdateMutation } from "@/lib/services/userApi";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

interface ProfileFormValues {
  mealName: string;
  mealType: string;
  calories: number;
  status: string;
}

const AddMeal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      mealName: "",
      mealType: "",
      calories: 0,
      status: "",
    },
  });

  const [
    updateProfile,
    { isLoading: isUpdating, isSuccess, isError: updateError, error },
  ] = useProfileUpdateMutation();

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const response = await updateProfile(data);
      if (response.data.success === true) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-start">
      <ToastContainer />
      <div className="lg:w-2/3 w-full lg:px-20 p-2 lg:py-8 bg-white rounded-lg shadow-md">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-6">
          <Link href={"/admin/meal"}>
            <IoMdArrowRoundBack />
          </Link>
          Add Meal
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="lg:flex gap-4">
            <div className="lg:w-1/2">
              <label
                htmlFor="mealName"
                className="block text-sm font-medium text-gray-700"
              >
                Meal Name
              </label>
              <div className="mt-1">
                <input
                  id="mealName"
                  type="text"
                  placeholder="Enter Meal Name"
                  {...register("mealName", {
                    required: "Meal name is required",
                  })}
                  className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.mealName ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.mealName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mealName.message}
                </p>
              )}
            </div>
            <div className="lg:w-1/2">
              <label
                htmlFor="mealType"
                className="block text-sm font-medium text-gray-700"
              >
                Meal Type
              </label>
              <div className="mt-1">
                <select
                  id="mealType"
                  {...register("mealType", {
                    required: "Meal type is required",
                  })}
                  className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.mealType ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Meal Type
                  </option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              {errors.mealType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mealType.message}
                </p>
              )}
            </div>
          </div>
          <div className="lg:flex gap-4">
            <div className="lg:w-1/2 mt-4 lg:mt-0">
              <label
                htmlFor="calories"
                className="block text-sm font-medium text-gray-700"
              >
                Calories
              </label>
              <div className="mt-1">
                <input
                  id="calories"
                  type="number"
                  placeholder="Enter Sub-total"
                  {...register("calories", {
                    required: "Calories is required",
                  })}
                  className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.calories ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.calories && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.calories.message}
                </p>
              )}
            </div>
            <div className="lg:w-1/2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Stock Status
              </label>
              <div className="mt-1">
                <select
                  id="status"
                  {...register("status")}
                  className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Stock Status
                  </option>
                  <option value="In_Stock">In Stock</option>
                  <option value="Out_of_Stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Link
              href={"/admin/meal"}
              className="text-center lg:w-1/8 w-full py-2.5 rounded-md bg-[#f53c3c] outline-4 text-white font-semibold hover:bg-[#d17171] focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="lg:w-1/8 w-full py-2.5 rounded-md bg-[#6E498B] text-white font-semibold hover:bg-[#9570b1] focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMeal;
