import { baseApis } from "../base";

export const orderApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        // POST /order/create-order
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: "/order/create-order",
                method: "POST",
                body: orderData
            }),
            transformResponse: (respons: any) => respons.data,
            invalidatesTags: ["order"],
        }),
    }),
    overrideExisting: true,
});

export const { useCreateOrderMutation } = orderApi;
