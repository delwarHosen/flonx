import { showToast } from '@/components/Toast';
import { logout } from '@/redux/authSlice';
import { getCurrentRoute } from '@/utils/routeStore';
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://rnj64vmh-3500.inc1.devtunnels.ms/api/v1',
  prepareHeaders: async (headers) => {
    const token = await SecureStore.getItemAsync('accessToken');
    // console.log(token)
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    return headers;
  },
});

let isRedirectingToLogin = false;
let lastLoginTime = 0;

export const setLastLoginTime = () => {
  lastLoginTime = Date.now();
};

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && (result.error as FetchBaseQueryError).status === 401) {
        const url = typeof args === 'string' ? args : args?.url || '';
        
        const isAuthEndpoint =
            url.includes('/auth/login') ||
            url.includes('/auth/guest') ||
            url.includes('/user/register') ||
            url.includes('/auth/forget-password') ||
            url.includes('/auth/verify-reset-otp') ||
            url.includes('/auth/reset-password');

       
        if (isAuthEndpoint || isRedirectingToLogin || (Date.now() - lastLoginTime < 3000)) {
            return result;
        }

        
        const { store } = require('@/redux/store');
        const currentRole = store.getState().auth.userRole;
        
        
        if (!currentRole) return result;

        const currentToken = await SecureStore.getItemAsync('accessToken');
        
       
        if (!currentToken) return result;

        try {
            const decoded: any = jwtDecode(currentToken);
            const isExpired = decoded.exp * 1000 < Date.now();
            if (!isExpired) return result;
        } catch (e) {}

        showToast('Session expired. Please login again.', 'error');
        isRedirectingToLogin = true;

        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('rememberMe');
        api.dispatch(logout());

        const savedPath = getCurrentRoute();

        setTimeout(() => {
            if (currentRole === 'guest') {
                router.replace('/select-role');
            } else {
                router.replace({
                    pathname: '/(auth)/login',
                    params: { returnTo: savedPath ? encodeURIComponent(savedPath) : '' },
                });
            }

            setTimeout(() => {
                isRedirectingToLogin = false;
            }, 2000);
        }, 100);
    }

    return result;
};

export const baseApis = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['auth', 'Profile', 'order', 'venue', 'Jobs', 'Cart', 'Applications', 'Notification'],
  endpoints: () => ({}),
});