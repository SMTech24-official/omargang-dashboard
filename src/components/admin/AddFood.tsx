"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ChevronDown, Upload } from "lucide-react";
import Link from "next/link";
import { useAddFoodMutation } from "@/lib/services/dashboardApi";
import MapSelector from "../mapSelector";
import LocationPickerModal from "../mapSelector";

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

const foodTypeOptions = Object.keys(FoodType).filter((key) =>
  isNaN(Number(key))
);

const dietOptions = Object.values(DietType);

export default function AddFoodPage() {
  const [addFoodFunc, { isLoading }] = useAddFoodMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    foodType: "",
    dietPreferences: "",
    address: "",
    price: "",
    discount: "",
    contactNumber: "",
    description: "",
    location: "",
    lattitude: "",
    longitude: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("foodType", formData.foodType);
    form.append("dietPreferences", formData.dietPreferences);
    form.append("address", formData.address);
    form.append("price", formData.price);
    form.append("discount", formData.discount);
    form.append("contactNumber", formData.contactNumber);
    form.append("foodImage", selectedImage);

    // Example restaurant IDs (replace with actual logic)
    form.append(
      "restaurantsIds",
      JSON.stringify(["682a9b4d2bf745a81220ff3c", "682a9d228c2f2e167df5a6b7"])
    );

    // Example location coordinates (replace with actual location selection logic)
    form.append("location[type]", "Point");
    form.append("location[coordinates][]", formData.lattitude);
    form.append("location[coordinates][]", formData.longitude);

    try {
      const response = await addFoodFunc(form);
      console.log(response);
      console.log(form)
      alert("Food added successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Link
          href="/admin/store"
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

        <div>
          {/* Location Input */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              placeholder="Search or click to select"
              onFocus={() => setShowMap(true)}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none cursor-pointer"
            />
          </div>

          {/* Modal */}
          {showMap && (
            <LocationPickerModal
              onClose={() => setShowMap(false)}
              onLocationSelect={(lat, lng, address) => {
                setFormData((prev) => ({
                  ...prev,
                  location: address,
                  address: address,
                  latitude: lat.toString(),
                  longitude: lng.toString(),
                }));
              }}
            />
          )}
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

        {/* Contact Info */}
        <div>
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contact Info
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            placeholder="Enter Contact Number"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
