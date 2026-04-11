import * as Application from 'expo-application';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const DEVICE_ID_KEY = 'guest_device_id';

export const getDeviceId = async (): Promise<string> => {
    if (Platform.OS === 'android') {
        const androidId = Application.getAndroidId();
        // console.log(androidId)
        if (androidId) return androidId;
    }

    const stored = await SecureStore.getItemAsync(DEVICE_ID_KEY);
    if (stored) return stored;

    const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await SecureStore.setItemAsync(DEVICE_ID_KEY, newId);
    return newId;
};