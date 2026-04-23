
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { baseApis } from './base';
import cartReducer from './cartSlice';
import { rtkQueryErrorLogger } from './middleware/errorMiddleware';

export const store = configureStore({
  reducer: {
    [baseApis.reducerPath]: baseApis.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApis.middleware,
      rtkQueryErrorLogger
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;