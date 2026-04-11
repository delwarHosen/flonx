import { useColorScheme } from '@/hooks/use-color-scheme';
import { setCredentials } from '@/redux/authSlice';
import { useGuestLoginMutation } from '@/redux/services/authApi';
import { RootState, store } from '@/redux/store';
import { getDeviceId } from '@/utils/deviceId';
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
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from 'expo-status-bar';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import { Provider, useDispatch, useSelector } from 'react-redux';

SplashScreen.preventAutoHideAsync();


function AppInit() {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.userRole);
  const [guestLogin] = useGuestLoginMutation();

  useEffect(() => {
    const initAuth = async () => {
      const existingToken = await SecureStore.getItemAsync('accessToken');

      if (existingToken) {
        try {
          const decoded: any = jwtDecode(existingToken);
          
          const roleFromToken = decoded.role;

          const actualRole = decoded.isGuest ? 'guest' : roleFromToken;

          if (roleFromToken && !role) {
            // dispatch(setCredentials({
            //   role: roleFromToken,
            //   token: existingToken
            // }));
            dispatch(setCredentials({ role: actualRole, token: existingToken }));
          }
        } catch (e) {
          console.log('Token decode error:', e);
        }
        return;
      }

      try {
        const deviceId = await getDeviceId();
        const res = await guestLogin(deviceId).unwrap();
        if (res?.accessToken) {
          await SecureStore.setItemAsync('accessToken', res.accessToken);
          dispatch(setCredentials({
            role: 'guest',
            token: res.accessToken
          }));
        }
      } catch (e) {
        console.log('Auto guest login error:', e);
      }
    };

    initAuth();
  }, []);

  return null;
}
// ── Root Layout ──
function RootLayoutInner() {
  const colorScheme = useColorScheme();
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
    }
    prepare();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0D1A' }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
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