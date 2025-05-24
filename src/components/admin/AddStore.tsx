"use client";

import { useRef, useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useAddStoreMutation } from "@/lib/services/dashboardApi";
import LocationPickerModal from "../mapSelector";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

type FormDataType = {
  name: string;
  contactInfo: string;
  address: string;
  location: string;
  latitude: string;
  longitude: string;
};

export default function AddStore() {
  const router = useRouter();
  const [addStoreFunc, { isLoading }] = useAddStoreMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showMap, setShowMap] = useState(false);

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
    contactInfo: "",
    address: "",
    location: "",
    latitude: "",
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

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("contactInfo", formData.contactInfo);
    form.append("address", formData.address);
    form.append("restaurantsImage", imageFile);
    form.append("location[type]", "Point");
    form.append("location[coordinates][]", formData.latitude);
    form.append("location[coordinates][]", formData.longitude);

    try {
      const response: any = await addStoreFunc(form);
      if (response.data) {
        toast.success("Store added successfully!");
        router.push("/admin/store");
      } else {
        toast.error(response.error.data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="bottom-right" />
      <div className="mb-6">
        <Link
          href="/admin/store"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Add Store</span>
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
              id="restaurantsImage"
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
            Store Name
          </label>
          <input
            type="text"
            placeholder="Enter Store Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
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
                  address: address,
                  location: address,
                  latitude: lat.toString(),
                  longitude: lng.toString(),
                }));
              }}
            />
          )}
        </div>

        {/* Contact Info */}
        <div>
          <label
            htmlFor="contactInfo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contact Info
          </label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo}
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
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
