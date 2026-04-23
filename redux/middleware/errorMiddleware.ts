import { showToast } from '@/components/Toast';
import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

const SUPPRESSED_STATUSES = [401];
const SUPPRESSED_MESSAGES = [
  'you are not authorized',
  'unauthorized',
  'jwt expired',
  'invalid token',
  'token expired',
  'token is expired',
];

let lastToastMessage = '';
let lastToastTime = 0;

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorData = action.payload as any;
    const status = errorData?.status;

    if (SUPPRESSED_STATUSES.includes(status)) return next(action);

    const errorMessage =
      errorData?.data?.message ||
      errorData?.message ||
      'Something went wrong!';

    const isSuppressed = SUPPRESSED_MESSAGES.some((m) =>
      errorMessage?.toLowerCase().includes(m)
    );
    if (isSuppressed) return next(action);


    const endpointName = (action as any)?.meta?.arg?.endpointName || '';
    const suppressedEndpoints = ['loginSubmit', 'guestLogin', 'viewCart'];
    if (suppressedEndpoints.some(e => endpointName.includes(e))) return next(action);

    const now = Date.now();
    if (errorMessage === lastToastMessage && now - lastToastTime < 3000) {
      return next(action);
    }

    lastToastMessage = errorMessage;
    lastToastTime = now;

    showToast(errorMessage, 'error');
  }

  return next(action);
};