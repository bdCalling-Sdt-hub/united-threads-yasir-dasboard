import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query: { label: string; value: string }[] | []) => {
        const params = new URLSearchParams();
        if (query.length) {
          query.forEach((item) => {
            params.append(item.label, item.value);
          });
        }
        return {
          url: "/user/all-users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ slug, data }) => {
        return {
          url: `/user/update-user/${slug}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Users"],
    }),
    getSingleUser: builder.query({
      query: ({ slug }: { slug?: string }) => {
        return {
          url: `/user/${slug}`,
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateAdminProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSingleUserQuery,
  useGetProfileQuery,
  useUpdateAdminProfileMutation,
  useChangePasswordMutation,
  useUpdateUserMutation,
} = usersApi;
