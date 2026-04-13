import { baseApis } from "../base";

export const profileApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        // POST /order/create-order
        getTermsConditions: builder.query({
            query: () => ({
                url: '/manage/get-terms-conditions',
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
        }),
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: '/manage/get-privacy-policy',
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
        }),
        getLegalInfo: builder.query({
            query: () => ({
                url: '/legal-info/get',
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
        }),

        // faq
        getFaq: builder.query({
            query: () => ({
                url: '/manage/get-faq',
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
        }),

        // create support 
        createSupportTicket: builder.mutation({
            query: (body: { contactReason: string; message: string }) => ({
                url: '/support/create',
                method: 'POST',
                body,
            }),
            transformResponse: (response: any) => response.data,
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetTermsConditionsQuery,
    useGetPrivacyPolicyQuery,
    useGetLegalInfoQuery,
    useGetFaqQuery,
    useCreateSupportTicketMutation,
} = profileApi;
