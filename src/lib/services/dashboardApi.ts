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
      query: () => "/admin/top-selling",
      providesTags: ["topSelling"],
    }),
  }),
});

export const {
  useDashboardSummeryQuery,
  useSalesReportQuery,
  useSpecialFoodsQuery,
  useTopSellingQuery
} = dashboardApi;
