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
      query: ({ page }) => `/food?limit=10&page=${page}`,
      providesTags: ["foodLists"],
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
} = dashboardApi;
