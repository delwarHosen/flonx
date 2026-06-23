import { Body1, Body2, Body3, ButtonText, H1, H6 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useUpdateOrderStatusMutation } from '@/redux/services/orderApi';
import { fp, hp, wp } from '@/utils/responsive';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
    orderId: string;
    orderCode: string;
}

export const PickupOrderContent: React.FC<PickupOrderContentProps> = ({
    pickupCode,
    successRoute,
    venueName = "Copper Alley Bar",
    orderId,
    orderCode,
}) => {
    const [status, setStatus] = useState<PickupStatus>(PickupStatus.READY);
    const router = useRouter();
    const translateX = useRef(new Animated.Value(0)).current;
    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    const orderIdRef = useRef(orderId);
    const updateOrderStatusRef = useRef(updateOrderStatus);

    useEffect(() => {
        if (orderId) {
            orderIdRef.current = orderId;
            console.log('orderIdRef updated:', orderId);
        }
    }, [orderId]);

    useEffect(() => {
        updateOrderStatusRef.current = updateOrderStatus;
    }, [updateOrderStatus]);


    const handleSlideComplete = useCallback(async () => {
        console.log('handleSlideComplete called, orderId:', orderIdRef.current); // debug
        try {
            await updateOrderStatusRef.current({
                id: orderIdRef.current,
                status: 'PICKED'
            }).unwrap();
            console.log('Status update success'); // debug
        } catch (e) {
            console.log('Status update error:', e);
        }
        setStatus(PickupStatus.CONFIRMED);
    }, []);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                const newDx = Math.max(0, Math.min(gestureState.dx, MAX_TRANSLATION));
                translateX.setValue(newDx);
            },
            onPanResponderRelease: (_, gestureState) => {
                console.log('Slide released, orderIdRef.current:', orderIdRef.current); // debug
                if (gestureState.dx >= MAX_TRANSLATION * 0.8) {
                    Animated.timing(translateX, {
                        toValue: MAX_TRANSLATION,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(async () => {
                        await handleSlideComplete();
                    });
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
            </View>

            <View style={styles.centerSection}>
                <H1 color="white" style={styles.codeText}>{pickupCode}</H1>
                <Body3 color="white" style={styles.pickupLabel}>Pickup Code</Body3>
            </View>

            <View style={styles.bottomSection}>
                {status === PickupStatus.CONFIRMED ? (
                    <TouchableOpacity
                        onPress={() => router.push({
                            pathname: successRoute as any,
                            params: { orderId: orderIdRef.current }
                        })}
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
        paddingVertical: Platform.OS === 'ios' ? hp(60) : hp(40),
        width: '100%'
    },
    headerSection: {
        marginTop: hp(10),
    },
    readyTitle: {
        fontSize: fp(18),
        height: hp(24),
        textAlign: 'center'
    },
    centerSection: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    codeText: {
        fontSize: SCREEN_WIDTH * 0.18,
        marginBottom: hp(12),
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
        height: hp(60),
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SLIDER_TRACK_PADDING,
        marginBottom: wp(12),
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
        height: hp(50),
        width: THUMB_WIDTH,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },
    textOverlay: {
        position: 'absolute',
        left: wp(20),
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
        marginRight: wp(8)
    },
    orderCodeText: {
        marginLeft: wp(8),
    },
});

export default PickupOrderContent;