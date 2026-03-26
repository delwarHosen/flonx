import { baseApis } from "../base";


export const authApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/user/register-user',
                method: 'POST',
                body: data,
            }),
        }),
        // OTP Verify mutation 
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: '/user/verify-code',
                method: 'POST',
                body: data,
            }),
        }),
        resendVerifyCode: builder.mutation({
            query: (data) => ({
                url: '/user/resend-verify-code',
                method: 'POST',
                body: data,
            }),
        }),
        //login mutation
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),

    }),
});


export const { useLoginMutation, useVerifyEmailMutation,useResendVerifyCodeMutation, useRegisterMutation } = authApi;