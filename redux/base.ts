import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

export const baseApis = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://10.10.20.9:3500/api/v1',
    baseUrl: 'https://rnj64vmh-3500.inc1.devtunnels.ms/api/v1',
    prepareHeaders: async (headers, { getState }) => {
      const token = await SecureStore.getItemAsync('accessToken');
      // console.log(token)
      //  console.log("token:", token ? "EXISTS" : "MISSING");
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['auth', 'Profile', 'order', 'venue', 'Jobs', 'Cart',"Applications"],
  endpoints: () => ({}),
});