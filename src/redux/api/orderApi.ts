import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (query: { label: string; value: string }[] | []) => {
        const params = new URLSearchParams();
        if (query.length) {
          query.forEach((item) => {
            params.append(item.label, item.value);
          });
        }
        return {
          url: "/order/orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Order"],
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, data }) => {
        return {
          url: `/order/update-order/${orderId}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Order"],
    }),
    getSingleOrder: builder.query({
      query: ({ slug: orderId }: { slug?: string }) => {
        return {
          url: `/order/${orderId}`,
          method: "GET",
        };
      },
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdersQuery, useGetSingleOrderQuery, useUpdateOrderMutation } = orderApi;
