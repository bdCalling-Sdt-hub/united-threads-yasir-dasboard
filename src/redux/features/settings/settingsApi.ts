
import { baseApi } from "../../api/baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings : builder.query({
      query: () => ({
        url: `/settings/get-settings`,
        method: "GET",
      }) 
    }),

    updateSettings : builder.mutation({
      query: (data) => ({
        url: "/settings/update",
        method: "PATCH",
        body: data,
      }),
    })
  }),
});

export const { useUpdateSettingsMutation, useGetSettingsQuery } = settingsApi;
