import { WarningIcon } from "@/assets/images/icons/ProfileInfoIcons/WarningIcon";
import { AnimatedModal } from "@/components/AnimatedModal";
import { CustomButton } from "@/components/CustomButton";
import CustomLoader from "@/components/CustomLoader";
import { Body1, Caption1 } from "@/components/typo/Typography";
import { Colors } from "@/constants/theme";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function LogoutScreen() {
    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCancel = (): void => {
        setShowModal(false);
        router.back();
    };

    const handleLogout = (): void => {
        // 1. Close modal first
        setShowModal(false);

        // 2. Wait for modal close animation, then show loader & call API
        setTimeout(async () => {
            setLoading(true);
            try {
                // TODO: clear auth tokens / session here
                await new Promise(resolve => setTimeout(resolve, 1500));
                router.replace("/(auth)/login");
            } catch (error) {
                // handle error
                setLoading(false);
            }
        }, 300);
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>

            {/* Full screen loader — shows after modal closes */}
            {loading && (
                <View style={styles.loaderOverlay}>
                    <CustomLoader size={55} />
                </View>
            )}

            {/* Modal */}
            <AnimatedModal visible={showModal}>
                <View style={styles.card}>

                    <View style={styles.iconPlaceholder}>
                        <WarningIcon size={28} />
                    </View>

                    <Body1 color={Colors.NEUTRAL0} style={styles.title}>
                        Log out?
                    </Body1>

                    <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.body}>
                        Are you sure you want to log out?
                    </Caption1>

                    <View style={styles.buttonRow}>
                        <View style={styles.flex1}>
                            <CustomButton
                                title="Cancel"
                                onPress={handleCancel}
                                width="100%"
                                height={44}
                                borderRadius={100}
                                backgroundColor="transparent"
                                borderColor={Colors.BRAND_PRIMARY}
                                color={Colors.BRAND_PRIMARY}
                            />
                        </View>
                        <View style={styles.flex1}>
                            <CustomButton
                                title="Log Out"
                                onPress={handleLogout}
                                width="100%"
                                height={44}
                                borderRadius={100}
                                secondaryColor="#FE4C5D"
                                primaryColor="#DC3545"
                            />
                        </View>
                    </View>

                </View>
            </AnimatedModal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    loaderOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 18,
        paddingHorizontal: 22,
        paddingTop: 30,
        paddingBottom: 24,
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    iconPlaceholder: {
        backgroundColor: "#EF44441A",
        alignItems: "center",
        justifyContent: "center",
        height: 52,
        width: 52,
        borderRadius: 10,
        marginBottom: 16,
    },
    title: {
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
    },
    body: {
        lineHeight: 21,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
    },
    flex1: {
        flex: 1,
    },
});