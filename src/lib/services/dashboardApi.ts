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

    storeLists: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/restaurants?limit=${limit}&page=${page}`,
      providesTags: ["storeLists"],
    }),

    foodInfo: builder.query({
      query: ({ foodId }) => `/food/get-single-food/${foodId}`,
      providesTags: ["foodLists"],
    }),

    storeInfo: builder.query({
      query: ({ storeId }) => `/restaurants/${storeId}`,
      providesTags: ["storeLists"],
    }),

    foodDelete: builder.mutation({
      query: ({ foodId }) => ({
        url: `/food/delete-food/${foodId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["foodLists"],
    }),

    storeDelete: builder.mutation({
      query: ({ storeId }) => ({
        url: `/restaurants/delete-store/${storeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["storeLists"],
    }),

    addFood: builder.mutation({
      query: (foodData: FormData) => ({
        url: `/food/create`,
        method: "POST",
        body: foodData,
      }),
      invalidatesTags: ["foodLists"],
    }),

    addStore: builder.mutation({
      query: (foodData: FormData) => ({
        url: `/restaurants/create`,
        method: "POST",
        body: foodData,
      }),
      invalidatesTags: ["storeLists"],
    }),

    updateFood: builder.mutation({
      query: ({ foodId, form }: { foodId: string; form: FormData }) => ({
        url: `/food/update-food/${foodId}`,
        method: "PATCH",
        body: form,
      }),
      invalidatesTags: ["foodLists"],
    }),

    updateStore: builder.mutation({
      query: ({ storeId, form }: { storeId: string; form: FormData }) => ({
        url: `/restaurants/update/${storeId}`,
        method: "PATCH",
        body: form,
      }),
      invalidatesTags: ["storeLists"],
    }),

    orderList: builder.query({
      query: ({ page, status }) =>
        `/booking/admin?limit=10&page=${page}&status=${status}`,
      providesTags: ["bookings"],
    }),

    reviewList: builder.query({
      query: ({ page, status }) =>
        `/booking/admin?limit=10&page=${page}&status=${status}`,
      providesTags: ["reviews"],
    }),

    reviewStatusUpdate: builder.mutation({
      query: ({ bookingId, data }) => ({
        url: `/booking/update-booking-status/${bookingId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["reviews"],
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
  useFoodInfoQuery,
  useUpdateFoodMutation,
  useAddStoreMutation,
  useStoreListsQuery,
  useStoreDeleteMutation,
  useStoreInfoQuery,
  useUpdateStoreMutation,
  useReviewListQuery,
  useReviewStatusUpdateMutation
} = dashboardApi;
