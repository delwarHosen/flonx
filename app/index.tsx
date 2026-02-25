import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function Splash() {
  const router = useRouter();
  const [showLogo, setShowLogo] = useState(false);
  const fadeAnim = new Animated.Value(0); 

  useEffect(() => {
    const init = async () => {
      await SplashScreen.hideAsync();
      
      
      setTimeout(() => {
        setShowLogo(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }, 500);

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000, 
          useNativeDriver: true,
        }).start(() => {
          
          router.replace('/onboarding');
        });
      }, 3000); 
    };

    init();
  }, []);

  return (
    <View style={styles.container}>
      {showLogo && (
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1] 
        }) }] }}>
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
    width: 200,
    height: 200,
  },
});