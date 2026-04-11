import { BartenderIcon, UserGuestIcon, UserIcon } from '@/assets/images/icons/icon';
import { CustomButton } from '@/components/CustomButton';
import { Caption1, Caption2, H3 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { setCredentials, setRole } from '@/redux/authSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import * as SecureStore from 'expo-secure-store';
// ConfirmationModal import
import { ConfirmationModal } from "@/components/ConfirmationModalProps";
import { baseApis } from '@/redux/base';
import { useGuestLoginMutation } from '@/redux/services/authApi';
import { getDeviceId } from '@/utils/deviceId';
import { hp, wp } from '@/utils/responsive';
import { jwtDecode } from 'jwt-decode';

const { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

// iOS-specific responsive helpers
const isSmallIOS = isIOS && height < 700;    // iPhone SE, iPhone 8
const isMediumIOS = isIOS && height >= 700 && height < 844;  // iPhone 11, XR
const isLargeIOS = isIOS && height >= 844;   // iPhone 12/13/14 Pro and above

const iosSpacing = (small: number, medium: number, large: number) => {
    if (!isIOS) return medium;
    if (isSmallIOS) return small;
    if (isMediumIOS) return medium;
    return large;
};


export default function SelectRole() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [selectedRole, setSelectedRole] = useState<'guest' | 'customer' | 'bartender' | null>(null);
    const [showAgeModal, setShowAgeModal] = useState<boolean>(false);
    const [guestLogin] = useGuestLoginMutation();

    const handleRole = () => {
        if (!selectedRole) return;
        setShowAgeModal(true);
    };

    const confirmAge = async () => {
        setShowAgeModal(false);

        if (selectedRole === 'guest') {
            const existingToken = await SecureStore.getItemAsync('accessToken');

            if (existingToken) {
                try {
                    const decoded: any = jwtDecode(existingToken);

                    if (decoded.role === 'customer' || decoded.role === 'bartender') {

                        const deviceId = await getDeviceId();
                        const res = await guestLogin(deviceId).unwrap();
                    
                        if (res?.accessToken) {
                            await SecureStore.setItemAsync('accessToken', res.accessToken);
                            dispatch(setCredentials({ role: 'guest', token: res.accessToken }));
                            dispatch(baseApis.util.resetApiState());
                        }
                        
                    } else {

                        dispatch(setRole('guest'));
                    }
                } catch (e) {
                    console.log('Guest login error:', e);
                    dispatch(setRole('guest'));
                }
            } else {

                try {
                    const deviceId = await getDeviceId();
                    const res = await guestLogin(deviceId).unwrap();
                    if (res?.accessToken) {
                        await SecureStore.setItemAsync('accessToken', res.accessToken);
                        dispatch(setCredentials({ role: 'guest', token: res.accessToken }));
                    }
                } catch (e) {
                    console.log('Guest login error:', e);
                }
            }
            router.push("/guest/search" as any);

        } else if (selectedRole === 'customer' || selectedRole === 'bartender') {
            dispatch(setRole(selectedRole));
            router.replace("/(auth)/register");
        }
    };

    const rejectAge = () => {
        setShowAgeModal(false);
        router.replace("/select-role");
    };

    const RenderBorder = ({ children, isSelected }: { children: React.ReactNode, isSelected: boolean }) => {
        if (isSelected) {
            return (
                <LinearGradient
                    colors={[Colors.BRAND_PRIMARY, Colors.BRAND_PRIMARY_LIGHT]}
                    start={{ x: 0.5, y: 1 }}
                    end={{ x: 1, y: -1 }}
                    style={styles.gradientWrapper}
                >
                    {children}
                </LinearGradient>
            );
        }
        return <View style={[styles.gradientWrapper, { backgroundColor: Colors.BORDER_COLOR }]}>{children}</View>;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Animated.View entering={FadeIn.duration(600)} style={styles.container}>

                <Animated.View entering={FadeInDown.delay(200).duration(500).springify()}>
                    <H3 italic color={Colors.NEUTRAL0} style={{ lineHeight: 36, }}>
                        How would you like to use FLŌNX?
                    </H3>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(300).duration(500).springify()}>
                    <Caption1 style={{ marginTop: iosSpacing(10, 16, 16), marginBottom: iosSpacing(20, 32, 32) }} color={Colors.PLACEHOLLDER_TEXT}>
                        Choose your role. You can switch roles later if needed.
                    </Caption1>
                </Animated.View>

                {/* ---- Guest Role ---- */}
                <Animated.View entering={FadeInDown.delay(400).duration(500).springify()}>
                    <Pressable onPress={() => setSelectedRole('guest')}>
                        <RenderBorder isSelected={selectedRole === 'guest'}>
                            <View style={styles.innerContent}>
                                <View style={styles.iconStyle}>
                                    <UserGuestIcon />
                                </View>
                                <Caption2 italic style={{ marginTop: iosSpacing(10, 16, 16) }} color={Colors.PLACEHOLLDER_TEXT}>
                                    Continue as Guest
                                </Caption2>
                            </View>
                        </RenderBorder>
                    </Pressable>
                </Animated.View>

                {/* --- Row Buttons --- */}
                <Animated.View
                    entering={FadeInDown.delay(500).duration(500).springify()}
                    style={styles.role_select_container}
                >
                    <Pressable style={{ flex: 1 }} onPress={() => setSelectedRole('customer')}>
                        <RenderBorder isSelected={selectedRole === 'customer'}>
                            <View style={[styles.innerContent, { paddingHorizontal: 12 }]}>
                                <View style={styles.iconStyle}>
                                    <UserIcon />
                                </View>
                                <Caption2 italic style={{ marginTop: iosSpacing(10, 16, 16), textAlign: 'center' }} color={Colors.PLACEHOLLDER_TEXT}>
                                    Continue as Customer
                                </Caption2>
                            </View>
                        </RenderBorder>
                    </Pressable>

                    <Pressable style={{ flex: 1 }} onPress={() => setSelectedRole('bartender')}>
                        <RenderBorder isSelected={selectedRole === 'bartender'}>
                            <View style={[styles.innerContent, { paddingHorizontal: 12 }]}>
                                <View style={styles.iconStyle}>
                                    <BartenderIcon />
                                </View>
                                <Caption2 italic style={{ marginTop: iosSpacing(10, 16, 16), textAlign: 'center' }} color={Colors.PLACEHOLLDER_TEXT}>
                                    Continue as Bartender
                                </Caption2>
                            </View>
                        </RenderBorder>
                    </Pressable>
                </Animated.View>

                <CustomButton
                    title="Next"
                    onPress={handleRole}
                    width={"100%"}
                    backgroundColor={selectedRole ? undefined : '#1D1733'}
                    color={selectedRole ? undefined : Colors.PLACEHOLLDER_TEXT}
                    style={{ marginTop: iosSpacing(20, 32, 32) }}
                />

                {/* Age Verification Modal */}
                <ConfirmationModal
                    visible={showAgeModal}
                    title="Age Verification!"
                    description="This e-commerce application sells alcoholic beverages. You must be 21+ years or older to browse and purchase products."
                    confirmText="21+ Enter"
                    cancelText="Exit"
                    onCancel={rejectAge}
                    onConfirm={confirmAge}
                />

            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: wp(20),
        paddingVertical: iosSpacing(16, 0, 0),
    },
    gradientWrapper: {
        borderRadius: 10,
        padding: 1.5,
    },
    innerContent: {
        backgroundColor: Colors.APP_BACKGROUND,
        borderRadius: 10,
        paddingVertical: iosSpacing(12, 16, 16),
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle: {
        height: hp(36),
        width: wp(36),
        borderRadius: 5,
        backgroundColor: Colors.ICON_BG_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    role_select_container: {
        flexDirection: "row",
        width: "100%",
        gap: 16,
        marginTop: iosSpacing(10, 16, 16),
    }
});