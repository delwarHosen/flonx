import { WarningIcon } from "@/assets/images/icons/ProfileInfoIcons/WarningIcon";
import { ConfirmationModal } from "@/components/ConfirmationModalProps";
import CustomLoader from "@/components/CustomLoader";
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


    const handleCancle = (): void => {
        setShowModal(false);
        setTimeout(async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(() => {
                    router.back();
                }, 500))
            } catch (error) {
                setLoading(false);
            }
        })
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>

            {loading && (
                <View style={styles.loaderOverlay}>
                    <CustomLoader size={55} />
                </View>
            )}
            <ConfirmationModal
                visible={showModal}
                title="Log out?"
                description="Are you sure you want to log out?"
                confirmText="Log Out"
                icon={<WarningIcon size={28} />}
                // onCancel={() => setShowModal(false)}
                onCancel={handleCancle}
                onConfirm={handleLogout}
            />


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