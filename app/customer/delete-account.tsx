import { WarningIcon } from "@/assets/images/icons/ProfileInfoIcons/WarningIcon";
import { AnimatedModal } from "@/components/AnimatedModal";
import { CustomButton } from "@/components/CustomButton";
import CustomLoader from "@/components/CustomLoader";
import { FormInput } from "@/components/inputForm/InputForm";
import { Body1, Body2, Caption1, Caption3 } from "@/components/typo/Typography";
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from "@/constants/form";
import { Colors } from "@/constants/theme";
import { useForm } from "@/hooks/useForm";
import { validatePassword } from "@/utils/validation";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    ToastAndroid,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeleteAccount() {
    const router = useRouter();

    // Modal state management
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(true);
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCancel = (): void => {
        setShowConfirmModal(false);
        setShowPasswordModal(false);
        router.back();
    };

    const handleContinue = (): void => {
        setShowConfirmModal(false);
        setTimeout(() => setShowPasswordModal(true), 300);
    };

    // useForm Hook with TypeScript
    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
    } = useForm({
        initialValues: {
            [FORM_FIELDS.PASSWORD]: "",
        },
        validationRules: {
            [FORM_FIELDS.PASSWORD]: validatePassword,
        },
        onSubmit: async (formValues: Record<string, string>) => {
            setLoading(true)
            try {
                const data = {
                    password: formValues[FORM_FIELDS.PASSWORD],
                };

                console.log("Deleting account with data:", data);

                // await deleteAccountApi(data);
                await new Promise(resolve => setTimeout(resolve, 1000));

                if (Platform.OS === 'android') {
                    ToastAndroid.show("Account deleted successfully", ToastAndroid.SHORT);
                }

                setShowPasswordModal(false);
                router.replace("/(auth)/login");
            } catch (error: any) {
                const message = error?.data?.message || error?.message || "Something went wrong!";
                if (Platform.OS === 'android') {
                    ToastAndroid.show(message, ToastAndroid.LONG);
                }
            } finally {
                setLoading(false)
            }
        },
    });

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                {/* ── Modal 1: Confirmation ── */}
                <AnimatedModal visible={showConfirmModal}>
                    <View style={styles.card}>
                        <View style={styles.iconPlaceholder}>
                            <WarningIcon size={28} />
                        </View>

                        <Body1 color={Colors.NEUTRAL0} style={styles.title}>Delete Your account?</Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.body}>
                            This action is permanent.{'\n'}
                            Your FLŌNX account, order history, and saved activity will be
                            permanently removed and cannot be recovered.
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
                                    title="Continue"
                                    onPress={handleContinue}
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

                {/* ── Modal 2: Password Confirmation ── */}
                <AnimatedModal visible={showPasswordModal}>
                    <View style={[styles.card, styles.cardLeft]}>
                        <Body2 color={Colors.NEUTRAL0} italic style={styles.title2}>- Confirm Account Deletion</Body2>

                        {/* Password Field */}
                        <View style={styles.inputWrapper}>
                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.PASSWORD]}
                                value={values[FORM_FIELDS.PASSWORD]}
                                onChangeText={(text: string) => handleChange(FORM_FIELDS.PASSWORD, text)}
                                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.PASSWORD]}
                                type="password"
                                error={errors[FORM_FIELDS.PASSWORD]}
                                touched={touched[FORM_FIELDS.PASSWORD]}
                                required
                            />
                        </View>

                        {/* Warning Banner */}
                        <View style={styles.warnBanner}>
                            <View style={styles.warnIconPlaceholder}>
                                <WarningIcon size={20} />
                            </View>
                            <Caption3 color={Colors.PLACEHOLLDER_TEXT} style={styles.warnText}>
                                For security reasons, we need your password to continue.
                                Once deleted, your account and associated data cannot be restored.
                            </Caption3>
                        </View>

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

                                {
                                    loading ? (
                                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <CustomLoader size={45} />
                                        </View>
                                    ) : (
                                        <CustomButton
                                            title="Confirm & delete"
                                            onPress={handleSubmit}
                                            width="100%"
                                            height={44}
                                            borderRadius={100}
                                            secondaryColor="#FE4C5D"
                                            primaryColor="#DC3545"
                                        />
                                    )
                                }
                            </View>
                        </View>
                    </View>
                </AnimatedModal>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
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
    cardLeft: {
        alignItems: 'flex-start',
    },
    iconPlaceholder: {
        backgroundColor: "#EF44441A",
        alignItems: "center",
        justifyContent: "center",
        height: 52,
        width: 52,
        borderRadius: 10,
        marginBottom: 16
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
    title2: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 20,
    },
    inputWrapper: {
        width: '100%',
        marginBottom: 10,
    },
    warnBanner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 10,
        padding: 12,
        gap: 10,
        marginBottom: 20,
    },
    warnIconPlaceholder: {
        backgroundColor: "#EF44441A",
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        borderRadius: 8
    },
    warnText: {
        flex: 1,
        lineHeight: 18,
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
    },
    flex1: {
        flex: 1,
    }
});