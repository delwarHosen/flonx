import { baseApis } from "../base";

export const orderApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        // POST /order/create-order
        createOrder: builder.mutation({
            query: () => ({
                url: "/order/create-order",
                method: "POST"
            }),
            invalidatesTags: ["order", "Cart"],
        }),

        // get All Order
        getOrder: builder.query({
            query: (orderData) => ({
                url: "/order/get-my-orders",
                method: "GET",
                params: {
                    page: orderData?.page || 1,
                    limit: orderData?.limit || 10,
                }
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ["order"],  
        }),

        // add to cart
        addToCart: builder.mutation({
            query: (cartData) => ({
                url: '/cart/add-to-cart',
                method: 'POST',
                body: cartData,
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ['Cart'],
        }),

        // view Cart
        viewCart: builder.query({
            query: () => ({
                url: '/cart/view-cart',
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['Cart'],
        }),

        // update  quantity
        updateCartQuantity: builder.mutation({
            query: ({ productId, quantity }) => ({
                url: '/cart/update-quantity',
                method: 'PATCH',
                body: { productId, quantity },
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ['Cart'],
        }),

        // remove from cart
        removeCartItem: builder.mutation({
            query: (productId) => ({
                url: '/cart/remove-cart-item',
                method: 'PATCH',
                body: { productId },
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ['Cart'],
        }),

        // Delete cart
        deleteCart: builder.mutation({
            query: () => ({
                url: '/cart/delete-cart',
                method: 'DELETE',
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ['Cart'],
        }),


    }),
    overrideExisting: true,
});

export const {
    useCreateOrderMutation,
    useGetOrderQuery,
    useAddToCartMutation,
    useViewCartQuery,
    useRemoveCartItemMutation,
    useUpdateCartQuantityMutation,
    useDeleteCartMutation,
} = orderApi;
