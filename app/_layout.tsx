import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// Native splash screen-ke auto-hide hote badha dey
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.APP_BACKGROUND }, 
        animation: 'none', 
      }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}