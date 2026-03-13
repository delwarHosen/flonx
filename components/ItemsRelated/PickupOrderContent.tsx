import { Body1, Body2, Body3, ButtonText, H1, H6 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive calculations based on screen width
const SLIDER_TRACK_PADDING = 5;
const HORIZONTAL_PADDING = 20; 
const SLIDER_TRACK_WIDTH = SCREEN_WIDTH - (HORIZONTAL_PADDING * 2);
const THUMB_WIDTH = 100; 
const MAX_TRANSLATION = SLIDER_TRACK_WIDTH - THUMB_WIDTH - (SLIDER_TRACK_PADDING * 2);

enum PickupStatus { READY = 1, CONFIRMED = 2 }

interface PickupOrderContentProps {
    pickupCode: string;
    successRoute: string;
    venueName?: string;
}

export const PickupOrderContent: React.FC<PickupOrderContentProps> = ({
    pickupCode,
    successRoute,
    venueName = "Copper Alley Bar"
}) => {
    const [status, setStatus] = useState<PickupStatus>(PickupStatus.READY);
    const router = useRouter();
    const translateX = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                const newDx = Math.max(0, Math.min(gestureState.dx, MAX_TRANSLATION));
                translateX.setValue(newDx);
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx >= MAX_TRANSLATION * 0.8) {
                    Animated.timing(translateX, {
                        toValue: MAX_TRANSLATION,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => setStatus(PickupStatus.CONFIRMED));
                } else {
                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: true,
                        bounciness: 8,
                    }).start();
                }
            },
        })
    ).current;

    const textOpacity = translateX.interpolate({
        inputRange: [0, MAX_TRANSLATION / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.fullScreenReady}>
            <View style={styles.headerSection}>
                <H6 color="white" italic style={styles.readyTitle}>Ready for pickup</H6>
                {/* {status !== PickupStatus.CONFIRMED ? (
                    <H6 color="white" italic style={styles.readyTitle}>Ready for pickup</H6>
                ) : (
                    <View style={styles.readyTitlePlaceholder} />
                )} */}
            </View>

            <View style={styles.centerSection}>
                <H1 color="white" style={styles.codeText}>{pickupCode}</H1>
                <Body3 color="white" style={styles.pickupLabel}>Pickup Code</Body3>
            </View>

            <View style={styles.bottomSection}>
                {status === PickupStatus.CONFIRMED ? (
                    <TouchableOpacity
                        onPress={() => router.push(successRoute as any)}
                        style={[styles.sliderTrack, styles.confirmedTrack]}>
                        <Body2 color="white">Pickup Confirmed.</Body2>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.sliderTrack}>
                        <Animated.View
                            {...panResponder.panHandlers}
                            style={[styles.sliderThumb, { transform: [{ translateX }] }]}
                        >
                            <ButtonText color="white">Slide</ButtonText>
                        </Animated.View>
                        <Animated.View style={[styles.textOverlay, { opacity: textOpacity }]}>
                            <Body1 color="#333">Slide to confirm</Body1>
                        </Animated.View>
                    </View>
                )}

                <View style={styles.footerInfo}>
                    <View style={styles.dot} />
                    <Body3 color="white">{venueName}</Body3>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreenReady: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Platform.OS === 'ios' ? 60 : 40, 
        width: '100%'
    },
    headerSection: {
        marginTop: 10,
    },
    readyTitle: {
        fontSize: 18,
        height: 24,
        textAlign: 'center'
    },
    readyTitlePlaceholder: {
        height: 24
    },
    centerSection: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    codeText: {
        fontSize: SCREEN_WIDTH * 0.18, 
        marginBottom: 12,
        textAlign: 'center'
    },
    pickupLabel: {
        fontSize: 18,
        textAlign: 'center'
    },
    bottomSection: {
        width: '100%',
        paddingHorizontal: HORIZONTAL_PADDING,
        alignItems: 'center'
    },
    sliderTrack: {
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SLIDER_TRACK_PADDING,
        marginBottom: 20,
        overflow: 'hidden',
        position: 'relative' 
    },
    confirmedTrack: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: 'white',
        justifyContent: 'center',
        overflow: 'visible'
    },
    sliderThumb: {
        backgroundColor: Colors.BRAND_PRIMARY,
        height: 50,
        width: THUMB_WIDTH,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },
    textOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    footerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Platform.OS === 'ios' ? 10 : 0
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'white',
        marginRight: 8
    },
});

export default PickupOrderContent;