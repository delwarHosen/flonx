import { showToast } from '@/components/Toast';
import { configureStore, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { baseApis } from './base';
import cartReducer from './cartSlice';


export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMessage = (action.payload as any)?.data?.message || "Something went wrong!";
    showToast(errorMessage, "error");
  }
  return next(action);
};

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