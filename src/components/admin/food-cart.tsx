"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

interface FoodCardProps {
  name: string;
  image: string;
  time: string;
  rating: number;
  discount: string;
}

export default function FoodCard({
  name,
  image,
  time,
  rating,
  discount,
}: FoodCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 overflow-hidden rounded-md">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={56}
            height={56}
            className="h-full w-full object-cover rounded-md"
          />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{new Date(time).toLocaleString()}</span>
            <span>|</span>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="#f59e0b"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>{rating}</span>
            </div>
          </div>
          <div className="mt-1 text-xs font-medium text-gray-500">
            {discount} % OFF
          </div>
        </div>
      </div>
      <button
        className="text-gray-400 hover:text-red-500"
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <Heart
          className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
        />
      </button>
    </div>
  );
}
