import { BartenderIcon, UserGuestIcon, UserIcon } from '@/assets/images/icon/icon'
import { CustomButton } from '@/components/CustomButton'
import { Caption1, Caption2, H3 } from '@/components/typo/Typography'
import { Colors } from '@/constants/theme'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SelectRole() {

    const handleRole = () => {
        console.log("Hello handle")
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Animated.View
                entering={FadeIn.duration(600)}
                style={styles.container}
            >
                {/* Header Section */}
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

                {/* ---- Guest Role (Full Width Gradient) ---- */}
                <Animated.View
                    entering={FadeInDown.delay(400).duration(500).springify()}
                >
                    <Pressable onPress={() => { /* Handle Navigation */ }}>
                        <LinearGradient
                            colors={[Colors.BRAND_PRIMARY, Colors.BRAND_PRIMARY_LIGHT]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientWrapper}
                        >
                            <View style={styles.innerContent}>
                                <View style={styles.iconStyle}>
                                    <UserGuestIcon />
                                </View>
                                <Caption2 italic style={{ marginTop: 16 }} color={Colors.PLACEHOLLDER_TEXT}>
                                    Continue as Guest
                                </Caption2>
                            </View>
                        </LinearGradient>
                    </Pressable>
                </Animated.View>

                {/* --- Row Buttons (Customer & Bartender) --- */}
                <Animated.View
                    entering={FadeInDown.delay(500).duration(500).springify()}
                    style={styles.role_select_container}
                >
                    <Pressable
                        onPress={() => { /* Handle Navigation */ }}
                        style={styles.roleButton}
                    >
                        <View style={styles.centeredContent}>
                            <View style={styles.iconStyle}>
                                <UserIcon />
                            </View>
                            <Caption2 italic style={{ marginTop: 16, textAlign: 'center' }} color={Colors.PLACEHOLLDER_TEXT}>
                                Continue as Customer
                            </Caption2>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => { /* Handle Navigation */ }}
                        style={styles.roleButton}
                    >
                        <View style={styles.centeredContent}>
                            <View style={styles.iconStyle}>
                                <BartenderIcon />
                            </View>
                            <Caption2 italic style={{ marginTop: 16, textAlign: 'center' }} color={Colors.PLACEHOLLDER_TEXT}>
                                Continue as Bartender
                            </Caption2>
                        </View>
                    </Pressable>
                </Animated.View>
                {/* ---button--- */}
                <CustomButton
                    title="Next"
                    onPress={handleRole}
                    width={"100%"}
                />
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: "5%",
    },
    gradientWrapper: {
        marginTop: 32,
        borderRadius: 10,
        padding: 1, // Border thickness
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
        padding: 2,
        backgroundColor: Colors.ICON_BG_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    role_select_container: {
        flexDirection: "row",
        width: "100%",
        marginTop: 16,
        gap: 10,
    },
    roleButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: 'transparent',
    },
    centeredContent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    }
})