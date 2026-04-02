import { baseApis } from "../base";

export const bartenderApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        // POST /order/create-order
        getBartenderById: builder.query({
            query: (bartenderId) => `/bartender/get-single/${bartenderId}`,
            transformResponse: (response: any) => response.data,
        }),
    }),
    overrideExisting: true,
});

export const { useGetBartenderByIdQuery } = bartenderApi;
