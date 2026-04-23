import { Colors } from '@/constants/theme';
import { RootState } from '@/redux/store';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const LOGO_SIZE = SCREEN_WIDTH * 0.5;

export default function Splash() {
  const router = useRouter();
  const [showLogo, setShowLogo] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const hasNavigated = useRef(false);

  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const userRoleRef = useRef(userRole);

  useEffect(() => {
    userRoleRef.current = userRole;
  }, [userRole]);

  useEffect(() => {
    const t1 = setTimeout(async () => {
      await SplashScreen.hideAsync();
      setShowLogo(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 200);

    const t2 = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // ✅ already navigate হয়ে গেলে আর করবে না
        if (hasNavigated.current) return;
        hasNavigated.current = true;

        const role = userRoleRef.current;
        console.log('index.tsx role:', role);

        if (role === 'customer') {
          router.replace('/customer/(tabs)/home');
        } else if (role === 'bartender') {
          router.replace('/bartender/(tabs)/browse');
        } else {
          router.replace('/(auth)/login');
        }
      });
    }, 3500);

    // ✅ component unmount হলে timer cancel করো
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <View style={styles.container}>
      {showLogo && (
        <Animated.View style={{
          opacity: fadeAnim,
          transform: [{
            scale: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 1]
            })
          }]
        }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    maxWidth: 250,
    maxHeight: 250,
  },
});