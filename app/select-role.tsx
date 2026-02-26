import { BartenderIcon, UserGuestIcon, UserIcon } from '@/assets/images/icon/icon'
import { CustomButton } from '@/components/CustomButton'
import { Caption1, Caption2, H3 } from '@/components/typo/Typography'
import { Colors } from '@/constants/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'; // 1. Import useState
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SelectRole() {
    const router = useRouter();
    // 2. Track selected role
    const [selectedRole, setSelectedRole] = useState<'guest' | 'customer' | 'bartender' | null>(null);

    const handleRole = () => {
        if (selectedRole === 'guest') router.push("/guest/(tabs)/search");
        if (selectedRole === 'customer') router.push("/(auth)/login");
        if (selectedRole === 'bartender') router.push("/customer/(tabs)/home");
    }

    // Helper to render the border logic
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
                    <H3 italic color={Colors.NEUTRAL0} style={{ lineHeight: 36 }}>
                        How would you like to use FLŌNX?
                    </H3>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(300).duration(500).springify()}>
                    <Caption1 style={{ marginTop: 16 }} color={Colors.PLACEHOLLDER_TEXT}>
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
                                <Caption2 italic style={{ marginTop: 16 }} color={Colors.PLACEHOLLDER_TEXT}>
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
                    {/* Customer Button */}
                    <Pressable style={{ flex: 1 }} onPress={() => setSelectedRole('customer')}>
                        <RenderBorder isSelected={selectedRole === 'customer'}>
                            <View style={[styles.innerContent, { paddingHorizontal: 12 }]}>
                                <View style={styles.iconStyle}>
                                    <UserIcon />
                                </View>
                                <Caption2 italic style={{ marginTop: 16, textAlign: 'center' }} color={Colors.PLACEHOLLDER_TEXT}>
                                    Continue as Customer
                                </Caption2>
                            </View>
                        </RenderBorder>
                    </Pressable>

                    {/* Bartender Button */}
                    <Pressable style={{ flex: 1 }} onPress={() => setSelectedRole('bartender')}>
                        <RenderBorder isSelected={selectedRole === 'bartender'}>
                            <View style={[styles.innerContent, { paddingHorizontal: 12 }]}>
                                <View style={styles.iconStyle}>
                                    <BartenderIcon />
                                </View>
                                <Caption2 italic style={{ marginTop: 16, textAlign: 'center' }} color={Colors.PLACEHOLLDER_TEXT}>
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
                />
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
    container: { flex: 1, justifyContent: "center", paddingHorizontal: "5%" },
    gradientWrapper: {
        marginTop: 16,
        borderRadius: 10,
        padding: 1.5, // This acts as the border thickness
    },
    innerContent: {
        backgroundColor: Colors.APP_BACKGROUND,
        borderRadius: 9,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle: {
        height: 36,
        width: 36,
        borderRadius: 5,
        backgroundColor: Colors.ICON_BG_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    role_select_container: {
        flexDirection: "row",
        width: "100%",
        marginTop: 0,
        gap: 10,
    }
})