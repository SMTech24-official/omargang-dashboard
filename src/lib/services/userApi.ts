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
        url: "/auth/login-admin",
        method: "POST",
        body: data,
      }),
    }),

    profileUpdate: builder.mutation({
      query: (data) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    userUpdate: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    profileImageUpdate: builder.mutation({
      query: (formData: FormData) => ({
        url: "/auth/update-profile-image",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["users"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/password-change",
        method: "PATCH",
        body: data,
      }),
    }),

    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "DELETE",
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

    userInfo: builder.query({
      query: ({ userId }) => `/users/${userId}`,
      providesTags: ["users"],
    }),

    getUsers: builder.query({
      query: ({ page }) => `/users?page=${page}&limit=10`,
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
  useGetUsersQuery,
  useChangePasswordMutation,
  useProfileImageUpdateMutation,
  useDeleteUserMutation,
  useUserInfoQuery,
  useUserUpdateMutation,
} = userApi;
