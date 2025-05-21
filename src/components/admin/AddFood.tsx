"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ChevronDown, Upload } from "lucide-react";
import Link from "next/link";
import { useAddFoodMutation } from "@/lib/services/dashboardApi";
import Select, { MultiValue } from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

enum FoodType {
  FRUIT,
  VEGETABLE,
  GRAIN,
  PROTEIN,
  DAIRY,
  FAT_OIL,
  SWEET,
  BEVERAGE,
  SNACK,
  CONDIMENT,
  HERB_SPICE,
  SOUP,
  BAKED_GOOD,
  PREPARED_MEAL,
  LEGUME,
  NUT_SEED,
  BREAKFAST,
}

enum DietType {
  VEGAN = "VEGAN",
  VEGETARIAN = "VEGETARIAN",
  KETO = "KETO",
  PALEO = "PALEO",
  GLUTEN_FREE = "GLUTEN_FREE",
  DAIRY_FREE = "DAIRY_FREE",
  LOW_CARB = "LOW_CARB",
  HIGH_PROTEIN = "HIGH_PROTEIN",
  HALAL = "HALAL",
  KOSHER = "KOSHER",
  PESCATARIAN = "PESCATARIAN",
  NONE = "NONE",
}

type FormDataType = {
  name: string;
  description: string;
  foodType: string;
  dietPreferences: string;
  price: string;
  discount: string;
  restaurantsIds: string[];
};

type OptionType = {
  label: string;
  value: string;
};

const foodTypeOptions = Object.keys(FoodType).filter((key) =>
  isNaN(Number(key))
);

const dietOptions = Object.values(DietType);

export default function AddFood() {
  const [addFoodFunc, { isLoading }] = useAddFoodMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    foodType: "",
    dietPreferences: "",
    price: "",
    discount: "",
    description: "",
    restaurantsIds: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("foodType", formData.foodType);
    form.append("dietPreferences", formData.dietPreferences);
    form.append("price", formData.price);
    form.append("discount", formData.discount);
    form.append("foodImage", imageFile);
    formData.restaurantsIds.forEach((id) => {
      form.append("restaurantsIds[]", id);
    });

    try {
      const response: any = await addFoodFunc(form);
      console.log(response);
      if (response.data) {
        toast.success("Food Added Successfully");
        router.push("/admin/food");
      } else {
        toast.error(response.error.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  // Sample data for options
  const restaurantOptions: OptionType[] = [
    { value: "682a9d228c2f2e167df5a6b7", label: "KFC" },
    { value: "682a9d228c2f2e167df5a6b8", label: "KFC2" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="bottom-right" />
      <div className="mb-6">
        <Link
          href="/admin/food"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Add Food</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50"
            onClick={handleImageClick}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-40 object-contain mx-auto"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Upload Image</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              id="foodImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Food Name
          </label>
          <input
            type="text"
            placeholder="Enter Food Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            type="text"
            placeholder="Enter Food Description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>

        {/* Food Type */}
        <div>
          <label
            htmlFor="foodType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Food Type
          </label>
          <div className="relative">
            <select
              id="foodType"
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none"
            >
              <option value="">Select Food Type</option>
              {foodTypeOptions.map((key) => (
                <option key={key} value={key}>
                  {key
                    .replace(/_/g, " ") // Replace underscores with spaces
                    .toLowerCase()
                    .replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Diet preference */}
        <div>
          <label
            htmlFor="dietPreferences"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Diet Preferences
          </label>
          <div className="relative">
            <select
              id="dietPreferences"
              name="dietPreferences"
              value={formData.dietPreferences}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none"
            >
              <option value="">Select Diet Preferences</option>
              {dietOptions.map((key) => (
                <option key={key} value={key}>
                  {key
                    .replace(/_/g, " ") // Replace underscores with spaces
                    .toLowerCase()
                    .replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Restaurents */}
        <div>
          <label
            htmlFor="restaurantsIds"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Restaurants
          </label>
          <Select
            isMulti
            options={restaurantOptions}
            value={restaurantOptions.filter((opt) =>
              formData.restaurantsIds.includes(opt?.value)
            )}
            onChange={(selectedOptions: MultiValue<OptionType>) => {
              setFormData((prev) => ({
                ...prev,
                restaurantsIds: selectedOptions.map((opt) => opt.value),
              }));
            }}
            placeholder="Search or select restaurants..."
            classNamePrefix="select"
          />
        </div>

        {/* Price and Discount Rate */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <div className="relative">
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Enter Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Discount Rate (%)
            </label>
            <input
              type="text"
              id="discount"
              name="discount"
              value={formData.discount}
              placeholder="Discount"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
