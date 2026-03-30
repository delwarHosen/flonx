import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

export const baseApis = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.10.20.9:3500/api/v1',
    prepareHeaders: async (headers, { getState }) => {
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['auth', 'profile', 'order','venue'], 
  endpoints: () => ({}),
});