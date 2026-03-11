// import { useRouter } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import { Animated, Dimensions, PanResponder, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { Body1, Body2, Body3, ButtonText, H1, H6 } from '@/components/typo/Typography';
// import { Colors } from '@/constants/theme';

// const { width } = Dimensions.get('window');
// const SLIDER_TRACK_PADDING = 5;
// const THUMB_APPROX_WIDTH = 80;
// const SLIDER_TRACK_WIDTH = width - 40;
// const MAX_TRANSLATION = SLIDER_TRACK_WIDTH - THUMB_APPROX_WIDTH - SLIDER_TRACK_PADDING * 2 - 10;

// enum PickupStatus {
//     READY = 1,
//     CONFIRMED = 2,
// }

// const PickupOrderScreen: React.FC = () => {
//     const [status, setStatus] = useState<PickupStatus>(PickupStatus.READY);
//     const router = useRouter();
//     const translateX = useRef(new Animated.Value(0)).current;

//     const panResponder = useRef(
//         PanResponder.create({
//             onStartShouldSetPanResponder: () => true,
//             onMoveShouldSetPanResponder: () => true,
//             onPanResponderMove: (_, gestureState) => {
//                 const newDx = Math.max(0, Math.min(gestureState.dx, MAX_TRANSLATION));
//                 translateX.setValue(newDx);
//             },
//             onPanResponderRelease: (_, gestureState) => {
//                 if (gestureState.dx >= MAX_TRANSLATION * 0.8) {
//                     Animated.timing(translateX, {
//                         toValue: MAX_TRANSLATION,
//                         duration: 200,
//                         useNativeDriver: true,
//                     }).start(() => {
//                         setStatus(PickupStatus.CONFIRMED);
//                     });
//                 } else {
//                     Animated.spring(translateX, {
//                         toValue: 0,
//                         useNativeDriver: true,
//                         bounciness: 8,
//                     }).start();
//                 }
//             },
//         })
//     ).current;

//     const textOpacity = translateX.interpolate({
//         inputRange: [0, MAX_TRANSLATION / 2],
//         outputRange: [1, 0],
//         extrapolate: 'clamp',
//     });

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.content}>
//                 <View style={styles.fullScreenReady}>
//                     {/* Hides the title when status is CONFIRMED */}
//                     {status !== PickupStatus.CONFIRMED ? (
//                         <H6 color="white" italic style={styles.readyTitle}>
//                             Ready for pickup
//                         </H6>
//                     ) : (
//                         <View style={styles.readyTitle} /> // Empty view to maintain spacing
//                     )}

//                     <View style={{ alignItems: 'center' }}>
//                         <H1 color="white" style={styles.codeText}>A44</H1>
//                         <Body3 color="white" style={styles.pickupLabel}>Pickup Code</Body3>
//                     </View>

//                     <View style={styles.bottomSection}>
//                         {status === PickupStatus.CONFIRMED ? (
//                             <TouchableOpacity
//                                 onPress={() => router.push("/guest/order-success")}
//                                 style={[styles.sliderTrack, styles.confirmedTrack]}>
//                                 <Body2 color="white">Pickup Confirmed.</Body2>
//                             </TouchableOpacity>
//                         ) : (
//                             <View style={styles.sliderTrack}>
//                                 <Animated.View
//                                     {...panResponder.panHandlers}
//                                     style={[styles.sliderThumb, { transform: [{ translateX }] }]}
//                                 >
//                                     <ButtonText color="white">Slide</ButtonText>
//                                 </Animated.View>

//                                 {/* This View now fades away based on translateX */}
//                                 <Animated.View style={{ opacity: textOpacity, marginLeft: 16 }}>
//                                     <Body1 color="#333">
//                                         Slide to confirm
//                                     </Body1>
//                                 </Animated.View>
//                             </View>
//                         )}

//                         <View style={styles.footerInfo}>
//                             <View style={styles.dot} />
//                             <Body3 color="white">Copper Alley Bar</Body3>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.COLOR_ACTIVE,
//     },
//     content: {
//         flex: 1,
//         paddingHorizontal: 20,
//         alignItems: 'center',
//     },
//     fullScreenReady: {
//         flex: 1,
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingVertical: 50,
//         width: '100%',
//     },
//     readyTitle: {
//         fontSize: 18,
//         height: 24, // Set a height to prevent the UI from jumping when it disappears
//     },
//     codeText: {
//         fontSize: 66,
//         marginBottom: 12,
//     },
//     pickupLabel: {
//         fontSize: 18,
//     },
//     bottomSection: {
//         width: '100%',
//         alignItems: 'center',
//     },
//     sliderTrack: {
//         backgroundColor: 'white',
//         width: '100%',
//         height: 60,
//         borderRadius: 30,
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: SLIDER_TRACK_PADDING,
//         marginBottom: 20,
//         overflow: 'hidden',
//     },
//     confirmedTrack: {
//         backgroundColor: 'transparent',
//         borderWidth: 1.5,
//         borderColor: 'white',
//         justifyContent: 'center',
//         overflow: 'visible',
//     },
//     sliderThumb: {
//         backgroundColor: Colors.BRAND_PRIMARY,
//         height: 50,
//         paddingHorizontal: 25,
//         borderRadius: 25,
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 10,
//     },
//     footerInfo: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     dot: {
//         width: 6,
//         height: 6,
//         borderRadius: 3,
//         backgroundColor: 'white',
//         marginRight: 8,
//     },
// });

// export default PickupOrderScreen;



import { PickupOrderContent } from '@/components/ItemsRelated/PickupOrderContent';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GuestPickup() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.COLOR_ACTIVE }}>
            <PickupOrderContent
                pickupCode="G12" 
                successRoute="/guest/order-success" 
            />
        </SafeAreaView>
    );
}