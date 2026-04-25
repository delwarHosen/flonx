// import '@/tasks/stripeTask'; 

import Toast, { showToast } from '@/components/Toast';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { setCredentials } from '@/redux/authSlice';
import { clearCart, setCartRole, setItemQuantity } from '@/redux/cartSlice';
import { useGuestLoginMutation } from '@/redux/services/authApi';
import { useViewCartQuery } from '@/redux/services/orderApi';
import { store } from '@/redux/store';
import { getDeviceId } from '@/utils/deviceId';
import { setCurrentRoute } from '@/utils/routeStore';
import {
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  useFonts
} from "@expo-google-fonts/nunito";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { Stack, usePathname } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from 'expo-status-bar';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { LogBox, View } from 'react-native';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import 'react-native-reanimated';
import { Provider, useDispatch } from 'react-redux';

function RouteTracker() {
  const pathname = usePathname();
  useEffect(() => {
    setCurrentRoute(pathname);
  }, [pathname]);
  return null;
}

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs();

OneSignal.Debug.setLogLevel(LogLevel.Verbose);
OneSignal.initialize(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID!);
OneSignal.Notifications.requestPermission(true);
OneSignal.Notifications.addEventListener('click', (event: any) => {
  const data = event.notification.additionalData;
  console.log('Notification clicked:', data);
});

function AppInit() {
  const dispatch = useDispatch();
  const [guestLogin] = useGuestLoginMutation();
  const { data: cartData } = useViewCartQuery(undefined);

  useEffect(() => {
    if (cartData?.items?.length) {
      dispatch(clearCart());
      cartData.items.forEach((item: any) => {
        if (item.product?._id && item.quantity) {
          dispatch(setItemQuantity({
            id: item.product._id,
            quantity: item.quantity,
            barId: cartData.venue?._id,
          }));
        }
      });
    }
  }, [cartData]);

  useEffect(() => {
    const initAuth = async () => {
      const existingToken = await SecureStore.getItemAsync('accessToken');
      const rememberMe = await SecureStore.getItemAsync('rememberMe');

      if (existingToken) {
        try {
          const decoded: any = jwtDecode(existingToken);
          const isExpired = decoded.exp * 1000 < Date.now();

          if (isExpired) {
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('rememberMe');
          } else if (decoded.isGuest) {
            dispatch(setCredentials({ role: 'guest', token: existingToken }));
            dispatch(setCartRole('guest'));
            return;
          } else if (decoded.role === 'customer' || decoded.role === 'bartender') {
            if (rememberMe === 'true') {
              dispatch(setCredentials({ role: decoded.role, token: existingToken }));
              dispatch(setCartRole(decoded.role));
              return;
            } else {
              await SecureStore.deleteItemAsync('accessToken');
              await SecureStore.deleteItemAsync('rememberMe');
            }
          }
        } catch (e) {
          await SecureStore.deleteItemAsync('accessToken');
        }
      }

      try {
        const deviceId = await getDeviceId();
        const res = await guestLogin(deviceId).unwrap();
        if (res?.accessToken) {
          await SecureStore.setItemAsync('accessToken', res.accessToken);
          dispatch(setCredentials({ role: 'guest', token: res.accessToken }));
          dispatch(setCartRole('guest'));
        }
      } catch (e: any) {
        showToast(e.message || 'Auto guest login error', 'error');
      }
    };

    initAuth();
  }, []);

  return null;
}

function RootLayoutInner() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const activate = async () => {
      try {
        await activateKeepAwakeAsync();
      } catch (err: any) {
        showToast("Keep Awake: " + err.message, "info");
      }
    };
    activate();
    return () => {
      deactivateKeepAwake();
    };
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold,
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
      if (fontError) {
        showToast("Font Load Error", "error");
      }
    }
    prepare();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0D1A' }}>
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RouteTracker />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#0D0D1A' },
              animation: 'slide_from_right',
              animationDuration: 300,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen
              name="(auth)"
              options={{ animation: 'none' }}
            />
          </Stack>
          <StatusBar style="light" />
        </ThemeProvider>
      </StripeProvider>
      <Toast />
    </View>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppInit />
      <RootLayoutInner />
    </Provider>
  );
}