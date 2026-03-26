import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { baseApis } from './base';

export const store = configureStore({
  reducer: {
    [baseApis.reducerPath]: baseApis.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApis.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;