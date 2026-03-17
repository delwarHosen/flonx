import { ForwarDArrowIcon } from '@/assets/images/icons/icon';
import { CustomButton } from '@/components/CustomButton';
import { Body1, H1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { RootState } from '@/redux/store';
import { hp, wp } from '@/utils/responsive';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';


const CONFIG = {
  bartender: {
    data: [
      { id: 1, title: 'Find Bartending Gigs', description: 'Discover bartending shifts at venues near you.' },
      { id: 2, title: 'Manage Your Assigned Shifts', description: 'View your upcoming gigs in one place.' },
    ],
    nextRoute: '/bartender/(tabs)/browse',
  },
  customer: {
    data: [
      { id: 1, title: 'Order Faster. Skip The Lines.', description: 'Scan the QR at the Venue.' },
      { id: 2, title: 'Built for Nights Out!', description: 'Track your order in real time.' },
    ],
    nextRoute: '/customer/(tabs)/home',
  },
} as const;

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  
 
  const userRole = useSelector((state: RootState) => state.auth.userRole) as 'bartender' | 'customer';
  
  
  const { data, nextRoute } = useMemo(() => CONFIG[userRole] || CONFIG.customer, [userRole]);

  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  const navigateToHome = () => router.push(nextRoute);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      
      opacity.value = withTiming(0, { duration: 200 });
      translateX.value = withTiming(-40, { duration: 200 });

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        translateX.value = 40;
        opacity.value = withTiming(1, { duration: 300 });
        translateX.value = withTiming(0, { duration: 300 });
      }, 200);
    } else {
      navigateToHome();
    }
  };

  const currentStep = data[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerWrapper}>
        <Animated.View style={[styles.onBoadingContent, animatedStyle]}>
          <H1 italic color={Colors.NEUTRAL0}>
            {currentStep.title}
          </H1>
          <Body1 style={{ marginTop: hp(20) }} italic color={Colors.PLACEHOLLDER_TEXT}>
            {currentStep.description}
          </Body1>
        </Animated.View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Skip"
          onPress={navigateToHome}
          backgroundColor="#1D1733"
          color="#9D5BFF"
        />
        <CustomButton
          title="Next"
          onPress={handleNext}
          icon={<ForwarDArrowIcon />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {  
    flex: 1, 
    backgroundColor: Colors.APP_BACKGROUND 
  },
  centerWrapper: { 
    flex: 1,
     justifyContent: 'center',
      alignItems: 'center', 
      paddingHorizontal: wp(20)
    },
  onBoadingContent: {
     width: '100%', 
     justifyContent: 'center' 
    },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    paddingBottom: "15%",
  },
});