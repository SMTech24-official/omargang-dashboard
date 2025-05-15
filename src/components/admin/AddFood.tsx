"use client";
import { useProfileUpdateMutation } from "@/lib/services/userApi";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

// Define the type for the form data
interface ProfileFormValues {
  foodImage: string;
  foodName: string;
  subTotal: number;
  description: string;
  total: number;
  extras: number;
}

interface Extra {
  name: string;
  price: string;
}

const AddFood = () => {
  // Initialize the form using useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileFormValues>({
    defaultValues: {
      foodImage: "",
      foodName: "",
      description: "",
      subTotal: 0,
      total: 0,
      extras: 0,
    },
  });

  const calculateFinalTotal = () => {
    const baseTotal = Number(watch("subTotal")) || 0;
    const extrasTotal = extras.reduce(
      (sum, extra) => sum + (parseFloat(extra.price) || 0),
      0
    );
    return baseTotal + extrasTotal;
  };

  const [
    updateProfile,
    { isLoading: isUpdating, isSuccess, isError: updateError, error },
  ] = useProfileUpdateMutation();

  const onSubmit = async (data: ProfileFormValues) => {
    const finalTotal = calculateFinalTotal();
    const finalData = {
      ...data,
      total: finalTotal,
      extras: extras.map((e) => ({
        name: e.name,
        price: parseFloat(e.price),
      })),
    };

    try {
      const response = await updateProfile(finalData);
      if (response.data.success === true) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    }
  };

  const [extras, setExtras] = useState<Extra[]>([]);

  const handleAddExtra = () => {
    setExtras((prev) => [...prev, { name: "", price: "" }]);
  };

  const handleChange = (index: number, field: keyof Extra, value: string) => {
    const updatedExtras = [...extras];
    updatedExtras[index][field] =
      field === "price" ? (parseFloat(value) || 0).toString() : value;
    setExtras(updatedExtras);
  };

  return (
    <div className="flex justify-start">
      <ToastContainer />
      <div className="lg:w-2/3 w-full lg:px-20 p-2 lg:py-8 bg-white rounded-lg shadow-md">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-6">
          <Link href={"/admin/food"}>
            <IoMdArrowRoundBack />
          </Link>
          Add Food
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="foodImage"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <div className="flex">
              <div className="mt-1 lg:w-[15%] w-[30%] px-4 py-2 rounded-s-md border border-gray-300">
                <input type="text" placeholder="Choose File" disabled />
              </div>
              <div className="mt-1 w-[85%]">
                <input
                  id="foodImage"
                  type="file"
                  {...register("foodImage", {
                    required: "Food image is required",
                  })}
                  className={`w-full px-4 py-2 rounded-e-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.foodImage ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
            </div>
            {errors.foodImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.foodImage.message}
              </p>
            )}
          </div>

          <div className="lg:flex gap-4">
            <div className="lg:w-1/2">
              <label
                htmlFor="foodName"
                className="block text-sm font-medium text-gray-700"
              >
                Food Name
              </label>
              <div className="mt-1">
                <input
                  id="foodName"
                  type="text"
                  placeholder="Enter Food Name"
                  {...register("foodName", {
                    required: "Food name is required",
                  })}
                  className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.foodName ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.foodName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.foodName.message}
                </p>
              )}
            </div>
            <div className="lg:w-1/2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <input
                  id="city"
                  type="text"
                  placeholder="Enter Description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description
                      ? "border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <div className="lg:flex gap-4">
            <div className="lg:w-1/2 mt-4 lg:mt-0">
              <label
                htmlFor="subTotal"
                className="block text-sm font-medium text-gray-700"
              >
                Sub Total
              </label>
              <div className="mt-1">
                <input
                  id="subTotal"
                  type="number"
                  placeholder="Enter Sub-total"
                  {...register("subTotal", {
                    required: "Sub-title is required",
                  })}
                  className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.subTotal ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.subTotal && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subTotal.message}
                </p>
              )}
            </div>
            <div className="lg:w-1/2 lg:mt-0 mt-4">
              <label
                htmlFor="total"
                className="block text-sm font-medium text-gray-700"
              >
                Final Total (Base + Extras)
              </label>
              <div className="mt-1">
                <input
                  disabled
                  id="total"
                  type="number"
                  placeholder="Total"
                  value={calculateFinalTotal()}
                  className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.total ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>

              {errors.total && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.total.message}
                </p>
              )}
            </div>
          </div>
          <div className="lg:flex gap-4">
            <div className="lg:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extras
              </label>
              {extras.map((extra, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Extra Food Name"
                    value={extra.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={extra.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                    className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddExtra}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Extra
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Link
              href={"/admin/food"}
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

export default AddFood;
