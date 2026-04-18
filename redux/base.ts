import { logout } from '@/redux/authSlice';
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://rnj64vmh-3500.inc1.devtunnels.ms/api/v1',
  prepareHeaders: async (headers) => {
    const token = await SecureStore.getItemAsync('accessToken');
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).status === 401) {

    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('rememberMe');

    api.dispatch(logout());
    api.dispatch(baseApis.util.resetApiState());


    router.replace({
      pathname: '/(auth)/login',
      params: {}
    });
  }

  return result;
};

export const baseApis = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['auth', 'Profile', 'order', 'venue', 'Jobs', 'Cart', 'Applications', 'Notification'],
  endpoints: () => ({}),
});