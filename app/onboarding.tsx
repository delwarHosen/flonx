import { ForwarDArrowIcon } from '@/assets/images/icons/icon';
import { CustomButton } from '@/components/CustomButton';
import { Body1, H1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OnboardingItem {
  id: number;
  title: string;
  description: string;
}

const { width } = Dimensions.get('window');

const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    title: 'Order Faster. Skip The Lines.',
    description:
      'Scan the QR at the Venue. Order and pay instantly from your phone.',
  },
  {
    id: 2,
    title: 'Built for Nights Out!',
    description:
      'Track your order in real time. Pick up using your color and code.',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const router = useRouter();
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      opacity.value = withTiming(0, { duration: 200 });
      translateX.value = withTiming(-40, { duration: 200 });

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        translateX.value = 40;
        opacity.value = withTiming(1, { duration: 300 });
        translateX.value = withTiming(0, { duration: 300 });
      }, 200);
    } else {
      router.push('/(auth)/login');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/login');
  };

  const currentStep = onboardingData[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Wrapping the animated view in a centered container 
         ensures the text stays exactly in the middle of the screen.
      */}
      <View style={styles.centerWrapper}>
        <Animated.View style={[styles.onBoadingContent, animatedStyle]}>
          <H1 italic color={Colors.NEUTRAL0}>
            {currentStep.title}
          </H1>
          <Body1 style={{ marginTop: 20 }} italic color={Colors.PLACEHOLLDER_TEXT}>
            {currentStep.description}
          </Body1>
        </Animated.View>
      </View>

      {/* Bottom navigation section */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Skip"
          onPress={handleSkip}
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
    backgroundColor: Colors.APP_BACKGROUND,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center', // Vertical center
    alignItems: 'center',     // Horizontal center
    paddingHorizontal: 20,
  },
  onBoadingContent: {
    width: '100%',
    justifyContent: 'center',
    // Removed marginTop: -10 to keep it mathematically centered
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40, // Reduced from 100 for better reachability on iOS
  },
});