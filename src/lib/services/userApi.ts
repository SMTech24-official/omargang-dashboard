import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users/create",
        method: "POST",
        body: data,
      }),
    }),

    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    profileUpdate: builder.mutation({
      query: (data) => ({
        url: "/auth/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    otpVerification: builder.mutation({
      query: (data) => ({
        url: "/auth/admin-verification",
        method: "POST",
        body: data,
      }),
    }),

    myProfile: builder.query({
      query: () => "/auth/profile",
      providesTags: ["users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useAdminLoginMutation,
  useOtpVerificationMutation,
  useMyProfileQuery,
  useProfileUpdateMutation,
} = userApi;
