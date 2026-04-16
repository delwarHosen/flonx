import { showToast } from '@/components/Toast';
import { PermissionResponse, useCameraPermissions } from 'expo-camera';

// Hook er return type interface define kora holo
interface UseCameraScannerReturn {
  hasPermission: boolean | null;
  checkPermission: () => Promise<boolean>;
}

export const useCameraScanner = (): UseCameraScannerReturn => {
  const [permission, requestPermission] = useCameraPermissions();

  /**
   * Camera permission check ebong request korar function
   * @returns Promise<boolean> - Permission granted hole true, na hole false
   */
  const checkPermission = async (): Promise<boolean> => {
    // 1. Jodi prothomei permission granted thake
    if (permission?.granted) {
      return true;
    }

    // 2. Jodi permission request korar proyojon hoy (deny kora thakle ba prothom bar hole)
    const response: PermissionResponse = await requestPermission();

    if (!response.granted) {
      showToast("Permission Required \n Camera access is needed to scan QR codes. Please enable it in your device settings.")
      return false;
    }

    return true;
  };

  return { 
    hasPermission: permission ? permission.granted : null, 
    checkPermission 
  };
};