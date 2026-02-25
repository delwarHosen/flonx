import { ForwarDArrowIcon } from '@/assets/images/icon/icon';
import { CustomButton } from '@/components/CustomButton';
import { Body1, ButtonText, H1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';


interface OnboardingItem {
  id: number;
  title: string;
  description: string
}

const { width, height } = Dimensions.get('window');

const onboardingData: OnboardingItem[] = [{

  id: 1,
  title: "Order Faster. No Lines.",
  description: "Scan the QR at the bar, order drinks from your phone, and pay instantly with Apple Pay, Google Pay, or card.",
},
{
  id: 2,
  title: "Built for Nights Out",
  description: "Track your order, pick it up using your unique color and code, and enjoy a smoother bar experience.",
}
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

      // Step 1: animate out
      opacity.value = withTiming(0, { duration: 200 });
      translateX.value = withTiming(-40, { duration: 200 });

      // Step 2: delay content change (JS side)
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);

        // Reset position
        translateX.value = 40;

        // Step 3: animate in
        opacity.value = withTiming(1, { duration: 300 });
        translateX.value = withTiming(0, { duration: 300 });

      }, 200);

    } else {
      router.push('/select-role');
    }
  };

  const handleSkip = () => {
    router.push('/select-role');
  }

  const currentStep = onboardingData[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.onBoadingContent, animatedStyle]}>
        <H1 italic color={Colors.NEUTRAL0}>{currentStep.title}</H1>
        <Body1 italic style={{ marginTop: 24 }} color={Colors.PLACEHOLLDER_TEXT}>{currentStep.description}</Body1>
      </Animated.View>
      {/* <View style={styles.onBoadingContent}>
        
      </View> */}

      {/* Bottom navigation section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSkip} activeOpacity={0.7}
          style={styles.skipButton}>
          <ButtonText color={Colors.BRAND_PRIMARY}>Skip</ButtonText>
        </TouchableOpacity>

        <CustomButton
          title="Next"
          onPress={handleNext}
          icon={<ForwarDArrowIcon />}
        />
      </View>
    </SafeAreaView>

  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.APP_BACKGROUND
  },
  onBoadingContent: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: -10
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 100
  },
  skipButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 44,
    borderRadius: 100,
    // backgroundColor: "#00000005"
  },


})
