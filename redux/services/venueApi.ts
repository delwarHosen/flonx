import { baseApis } from "../base";

export const venueApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({

        // Response shape: { success, message, data: { meta, result: [...] } }
        // transformResponse → { meta, result: [...] }
        getAllVenues: builder.query({
            query: (params) => ({
                url: "/venue/get-all",
                method: "GET",
                params: {
                    searchTerm: params?.searchTerm || '',
                    lat: params?.lat,
                    lng: params?.lng,
                    maxDistance: params?.maxDistance || 10,
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                },
            }),
            // data = { meta: {...}, result: [...] }
            transformResponse: (response: any) => response.data,
            providesTags: ['order'],
        }),

        // Response shape: { success, message, data: [...] }
        // transformResponse → [...]
        getCategoriesByVenue: builder.query({
            query: (venueId) => `/category/venue-categories/${venueId}`,
            transformResponse: (response: any) => response.data ?? [],
            keepUnusedDataFor: 300, // 5 min cache — re-mount don't  refetch
        }),

        // Response shape: { success, message, data: { meta, result: [...] } }
        // transformResponse → [...]
        // Supported query params: category, sort, searchTerm, page, limit
        getProductsByVenue: builder.query({
            query: ({ venueId, categoryId, searchTerm, sort, page, limit }) => ({
                url: `/product/venue-products/${venueId}`,
                method: "GET",
                params: {
                    ...(categoryId && { category: categoryId }),
                    ...(searchTerm && { searchTerm }),
                    ...(sort && { sort }),
                    ...(page && { page }),
                    ...(limit && { limit }),
                },
            }),
            transformResponse: (response: any) => response?.data?.result ?? [],
            keepUnusedDataFor: 300,
        }),
        // get venue
        getVenueById: builder.query({
            query: (venueId) => ({
                url: `/venue/get-single/${venueId}`,
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetAllVenuesQuery,
    useGetCategoriesByVenueQuery,
    useGetProductsByVenueQuery,
    useGetVenueByIdQuery
} = venueApi;