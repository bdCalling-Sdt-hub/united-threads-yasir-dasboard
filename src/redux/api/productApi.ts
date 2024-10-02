import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query: { label: string; value?: string }[] | []) => {
        const params = new URLSearchParams();
        if (query.length) {
          query.forEach((item) => {
            if (item.value && item.value !== "ALL") {
              params.append(item.label, item.value);
            }
          });
        }

        return {
          url: "/product/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/add-product",
        method: "POST",
        body: data,
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/product/update-product/${productId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: ({ productId }) => ({
        url: `/product/delete-product/${productId}`,
        method: "DELETE",
      }),
    }),

    getSingleProduct: builder.query({
      query: ({ productId }) => ({
        url: `/product/get-product/${productId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
} = productApi;
