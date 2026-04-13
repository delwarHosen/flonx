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
            invalidatesTags: ['Profile'],
        }),

        // forgot password
        forgetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/forget-password',
                method: 'POST',
                body: data,
            }),
        }),

        // forget verify otp
        verifyForgetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-reset-otp',
                method: 'POST',
                body: data,
            }),
        }),

        // reset password
        resetPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: data
            })
        }),
        // Change password
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/auth/change-password",
                method: "POST",
                body: data
            }),
        }),

        // delete account
        deleteAccount: builder.mutation({
            query: (data) => ({
                url: "/user/delete-account",
                method: "POST",
                body: data
            })
        }),

        // get profile
        getProfile: builder.query({
            query: () => ({
                url: '/user/user-profile',
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['Profile'],
        }),

        // update profile
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/user/update-profile',
                method: 'PATCH',
                body: data,
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ['Profile'],
        }),

        // guest login 
        guestLogin: builder.mutation({
            query: (deviceId: string) => ({
                url: '/auth/guest',
                method: 'POST',
                body: { deviceId },
            }),
            transformResponse: (response: any) => response.data,
        }),


    }),
    overrideExisting: true,
});

export const {
    useLoginMutation,
    useVerifyEmailMutation,
    useResendVerifyCodeMutation,
    useRegisterMutation,
    useForgetPasswordMutation,
    useVerifyForgetPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useDeleteAccountMutation,
        useGetProfileQuery,
    useUpdateProfileMutation,
    useGuestLoginMutation
} = authApi;