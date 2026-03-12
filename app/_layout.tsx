import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/redux/store';
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
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
SplashScreen.preventAutoHideAsync();

// Native splash screen-ke auto-hide hote badha dey




export default function RootLayout() {
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
    if (fontError) {
      console.log('Font Error:', fontError); 
    }
    if (fontsLoaded) {
      console.log('Fonts loaded successfully!'); // ← এটা missing ছিল
    }
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }
  prepare();
}, [fontsLoaded, fontError]);


  if (!fontsLoaded && !fontError) return null;

  return (
    <Provider store={store}>
      <View style={{ flex: 1, backgroundColor: '#0D0D1A' }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0D0D1A' },
            animation: 'none',
          }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />

          </Stack>
          <StatusBar style="light" />
        </ThemeProvider>
      </View>
    </Provider>

  );
}