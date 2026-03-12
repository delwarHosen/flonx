import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const LOGO_SIZE = SCREEN_WIDTH * 0.5;

export default function Splash() {
  const router = useRouter();
  const [showLogo, setShowLogo] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const init = async () => {
      try {
       
        setShowLogo(true);

       
        setTimeout(async () => {
          await SplashScreen.hideAsync(); 

        
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800, 
            useNativeDriver: true,
          }).start();
        }, 200);

        
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            router.replace('/(auth)/login');
          });
        }, 3500);
      } catch (e) {
        console.warn(e);
      }
    };

    init();
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