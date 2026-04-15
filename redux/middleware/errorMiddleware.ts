// redux/middleware/errorMiddleware.ts
import { showToast } from '@/components/Toast';
import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  
  if (isRejectedWithValue(action)) {
    const errorData = action.payload as any;
    
    
    const errorMessage = 
      errorData?.data?.message || 
      errorData?.message || 
      "Something went wrong!";

    
    showToast(errorMessage, "error");
  }

  return next(action);
};