
import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers : builder.query({
      query: (query:{label:string,value:string}[] | []) => {
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
      }
      },
      providesTags: ["Users"],
    }),
    getUserCount : builder.query({
      query: (query:{label:string,value:string}[] | []) => {
        const params = new URLSearchParams();
        if (query.length) {
          query.forEach((item) => {
            params.append(item.label, item.value);
          });
        }
        return {
        url: "/user/count",
        method: "GET",
        params: params,
      }
      },
      providesTags: ["Users"],
    }),
     updateUser: builder.mutation({
       query: ({slug,data}) => {
        return {
        url: `/user/update-user/${slug}`,
        method: "PATCH",
        body: data,
      }
       },
      invalidatesTags: ["Users"],
    }),
    getSingleUser : builder.query({
      query: ({slug}:{slug?:string}) => {
        return {
        url: `/user/${slug}`,
        method: "GET",
      }
      },
      providesTags: ["Users"],
    }),
    getAdditionalInfo: builder.query({
      query: ({slug,role}:{slug?:string,role:string}) => ({
        url: `/${role}/${slug}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getAllDoctor: builder.query({
      query: (query:{label:string,value:string}[] | []) => {
         const params = new URLSearchParams();
        if (query.length) {
          query.forEach((item) => {
            params.append(item.label, item.value);
          });
        }
        return {
        url: "/doctor/doctor-list",
        method: "GET",
        params
      }
      },
      providesTags: ["Doctors"],
    }),
    getProfile : builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["Users"],
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
  useGetUserCountQuery, 
  useGetSingleUserQuery, 
  useGetAdditionalInfoQuery, 
  useGetAllDoctorQuery, 
  useGetProfileQuery,
  useUpdateAdminProfileMutation,
  useChangePasswordMutation,
  useUpdateUserMutation
} = usersApi;
