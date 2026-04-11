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
    }),
    overrideExisting: true,
});

export const { useGetTermsConditionsQuery,useGetPrivacyPolicyQuery } = profileApi;
