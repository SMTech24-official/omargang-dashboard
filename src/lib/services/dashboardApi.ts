import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardSummery: builder.query({
      query: () => "/admin/dashboard-summary",
      providesTags: ["users"],
    }),

    salesReport: builder.query({
      query: () => "/admin/sales-report",
      providesTags: ["sales"],
    }),

    specialFoods: builder.query({
      query: () => "/admin/special-resources",
      providesTags: ["specialFoods"],
    }),

    topSelling: builder.query({
      query: ({ foodType = "", startDate = "", endDate = "" }) =>
        `/admin/top-selling?foodType=${foodType}&endDate=${endDate}&startDate=${startDate}`,
      providesTags: ["topSelling"],
    }),

    foodLists: builder.query({
      query: ({ page }) => `/food/admin?limit=10&page=${page}`,
      providesTags: ["foodLists"],
    }),

    foodDelete: builder.mutation({
      query: ({ foodId }) => ({
        url: `/food/delete-food/${foodId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["foodLists"],
    }),

    addFood: builder.mutation({
      query: (foodData: FormData) => ({
        url: `/food/create`,
        method: "POST",
        body: foodData,
      }),
      invalidatesTags: ["foodLists"],
    }),

    orderList: builder.query({
      query: ({ page }) => `/booking/admin?limit=10&page=${page}`,
      providesTags: ["bookings"],
    }),

    orderStatusUpdate: builder.mutation({
      query: ({ bookingId, data }) => ({
        url: `/booking/update-booking-status/${bookingId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const {
  useDashboardSummeryQuery,
  useSalesReportQuery,
  useSpecialFoodsQuery,
  useTopSellingQuery,
  useFoodListsQuery,
  useOrderListQuery,
  useOrderStatusUpdateMutation,
  useFoodDeleteMutation,
  useAddFoodMutation,
} = dashboardApi;
