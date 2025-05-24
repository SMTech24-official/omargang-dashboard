import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5002/api/v1",
    baseUrl: "https://api.barakadish.com/api/v1",
    prepareHeaders: (headers) => {
      const accessToken = Cookies?.get("accessToken");
      headers.set("x-api-key", `AABBCCCDDDJJKKIIUU1234`);
      console.log(process.env.API_KEY);
      if (accessToken) {
        headers.set("Authorization", `${accessToken}`);

        return;
      }
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "login",
    "users",
    "sales",
    "specialFoods",
    "topSelling",
    "foodLists",
    "bookings",
    "storeLists",
    "reviews",
  ],
});
