import { baseApis } from "../base";

export const orderApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({

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

        // update quantity
        updateCartQuantity: builder.mutation({
            query: ({ productId, quantity }) => ({
                url: '/cart/update-quantity',
                method: 'PATCH',
                body: { productId, quantity },
            }),
            transformResponse: (response: any) => response.data,
            async onQueryStarted({ productId, quantity }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        (orderApi.util.updateQueryData as any)('viewCart', undefined, (draft: any) => {
                            const item = draft.items.find(
                                (i: any) => i.product?._id === productId
                            );
                            if (item) item.quantity = quantity;
                        })
                    );
                } catch {}
            },
        }),

        // remove from cart
        removeCartItem: builder.mutation({
            query: (productId) => ({
                url: '/cart/remove-cart-item',
                method: 'PATCH',
                body: { productId },
            }),
            transformResponse: (response: any) => response.data,
            async onQueryStarted(productId, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        (orderApi.util.updateQueryData as any)('viewCart', undefined, (draft: any) => {
                            draft.items = draft.items.filter(
                                (i: any) => i.product?._id !== productId
                            );
                        })
                    );
                } catch {}
            },
        }),

        // Delete cart
        deleteCart: builder.mutation({
            query: () => ({
                url: '/cart/delete-cart',
                method: 'DELETE',
            }),
            transformResponse: (response: any) => response.data,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        (orderApi.util.updateQueryData as any)('viewCart', undefined, (draft: any) => {
                            draft.items = [];
                        })
                    );
                } catch {}
            },
        }),

        // POST /order/create-order
        createOrder: builder.mutation({
            query: () => ({
                url: "/order/create-order",
                method: "POST"
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ["order"],
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
            keepUnusedDataFor: 0,
        }),

        // patch picked up order
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/order/update-status/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ['order'],
        }),

        // tip bartender
        tipToBartender: builder.mutation<any, { id: string; amount: number }>({
            query: ({ id, amount }) => ({
                url: `/order/tip-to-bartender/${id}`,
                method: 'POST',
                body: { amount },
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ['order'],
        }),
    }),
    overrideExisting: true,
});

export const {
    useAddToCartMutation,
    useViewCartQuery,
    useRemoveCartItemMutation,
    useUpdateCartQuantityMutation,
    useDeleteCartMutation,
    useCreateOrderMutation,
    useGetOrderQuery,
    useUpdateOrderStatusMutation,
    useTipToBartenderMutation,
} = orderApi;