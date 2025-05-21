"use client";

import {
  useLoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { useState, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 23.8103, // Dhaka default
  lng: 90.4125,
};

type Props = {
  onClose: () => void;
  onLocationSelect: (lat: number, lng: number, address: string) => void;
};

export default function LocationPickerModal({
  onClose,
  onLocationSelect,
}: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    if (lat && lng) {
      setMarker({ lat, lng });
      reverseGeocode(lat, lng);
    }
  };

  const handlePlaceChanged = () => {
    const place: any = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMarker({ lat, lng });
      onLocationSelect(lat, lng, place.formatted_address || place.name);
      onClose();
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    const { results } = await geocoder.geocode({ location: { lat, lng } });
    if (results[0]) {
      onLocationSelect(lat, lng, results[0].formatted_address);
      onClose();
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 p-8 rounded-lg w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✖
        </button>

        <Autocomplete
          onLoad={(ref) => (autocompleteRef.current = ref)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Search a location"
            className="w-full mb-4 px-4 py-2 border rounded-lg"
          />
        </Autocomplete>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={marker || defaultCenter}
          zoom={10}
          onClick={handleMapClick}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
      </div>
    </div>
  );
}
