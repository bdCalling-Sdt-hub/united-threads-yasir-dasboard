import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserCount: builder.query({
      query: () => {
        return {
          url: "/meta/user-count",
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),
    getRevenueCount: builder.query({
      query: (query: { label: string; value: string }[] | []) => {
        const params = new URLSearchParams();
        if (query.length) {
          query.forEach((item) => {
            params.append(item.label, item.value);
          });
        }
        return {
          url: "/meta/revenue-count",
          method: "GET",
          params: params,
        };
      },
    }),
    getSellCount: builder.query({
      query: (query: { label: string; value: string }[] | []) => {
        const params = new URLSearchParams();
        if (query.length) {
          query.forEach((item) => {
            params.append(item.label, item.value);
          });
        }
        return {
          url: "/meta/sell-count",
          method: "GET",
          params: params,
        };
      },
    }),
    getUserAndRevenueCount: builder.query({
      query: () => {
        return {
          url: "/meta/user-and-revenue",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetUserCountQuery,
  useGetRevenueCountQuery,
  useGetSellCountQuery,
  useGetUserAndRevenueCountQuery,
} = usersApi;
