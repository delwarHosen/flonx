import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

// Native splash screen-ke auto-hide hote badha dey
SplashScreen.preventAutoHideAsync();




export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  return (
    // Wrap everything in a View with your specific background color
    <View style={{ flex: 1, backgroundColor: '#0D0D1A' }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{
          headerShown: false,
          // Match the background color here as well
          contentStyle: { backgroundColor: '#0D0D1A' },
          animation: 'none',
        }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </View>
  );
}