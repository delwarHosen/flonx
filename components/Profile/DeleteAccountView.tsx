import { WarningIcon } from "@/assets/images/icons/ProfileInfoIcons/WarningIcon";
import { AnimatedModal } from "@/components/AnimatedModal";
import { CustomButton } from "@/components/CustomButton";
import CustomLoader from "@/components/CustomLoader";
import { FormInput } from "@/components/inputForm/InputForm";
import { Body1, Body2, Caption1, Caption3 } from "@/components/typo/Typography";
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from "@/constants/form";
import { Colors } from "@/constants/theme";
import { useForm } from "@/hooks/useForm";
import { useDeleteAccountMutation } from "@/redux/services/authApi";
import { RootState } from "@/redux/store";
import { fp, hp, wp } from "@/utils/responsive";
import { validatePassword } from "@/utils/validation";
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux';
import { showToast } from "../Toast";

export default function DeleteAccountView() {
    const router = useRouter();

    const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
    const userRole = useSelector((state: RootState) => state.auth.userRole);

    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(true);
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCancel = (): void => {
        setShowConfirmModal(false);
        setShowPasswordModal(false);
        setTimeout(() => router.back(), 300);
    };

    const handleContinue = (): void => {
        setShowConfirmModal(false);
        setTimeout(() => setShowPasswordModal(true), 300);
    };

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
            try {
                const payload = {
                    password: formValues[FORM_FIELDS.PASSWORD],
                    role: userRole,
                };

                const res = await deleteAccount(payload).unwrap();

                if (res?.success) {
                    await SecureStore.deleteItemAsync('accessToken');



                    showToast(res.message || "Account deleted successfully",)
                    setShowPasswordModal(false);

                    router.dismissAll();
                    router.replace("/(auth)/login");
                }
            } catch (error: any) {
                showToast(error?.data?.message || "Incorrect password or failed to delete account")
            }
        },
    });

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                {/* ── Modal 1: Confirmation ── */}
                <AnimatedModal visible={showConfirmModal}>
                    <View style={styles.card}>
                        <View style={styles.iconPlaceholder}>
                            <WarningIcon size={28} />
                        </View>

                        <Body1 color={Colors.NEUTRAL0} style={styles.title}>
                            Delete {userRole === 'bartender' ? 'Bartender' : 'Your'} Account?
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.body}>
                            This action is permanent.{'\n'}
                            Your {userRole} profile,
                            {userRole === 'bartender' ? ' shift history,' : ' order records,'}
                            and all associated data will be removed from FLŌNX.
                        </Caption1>

                        <View style={styles.buttonRow}>
                            <View style={styles.flex1}>
                                <CustomButton
                                    title="Cancel"
                                    onPress={handleCancel}
                                    width="100%"
                                    height={hp(44)}
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
                                    height={hp(44)}
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
                        <Body2 color={Colors.NEUTRAL0} italic style={styles.title2}>
                            - Confirm {userRole} Account Deletion
                        </Body2>

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

                        <View style={styles.warnBanner}>
                            <View style={styles.warnIconPlaceholder}>
                                <WarningIcon size={20} />
                            </View>
                            <Caption3 color={Colors.PLACEHOLLDER_TEXT} style={styles.warnText}>
                                For security, enter your password to delete this {userRole} account.
                            </Caption3>
                        </View>

                        <View style={styles.buttonRow}>
                            <View style={styles.flex1}>
                                <CustomButton
                                    title="Cancel"
                                    onPress={handleCancel}
                                    width="100%"
                                    height={hp(44)}
                                    borderRadius={100}
                                    backgroundColor="transparent"
                                    borderColor={Colors.BRAND_PRIMARY}
                                    color={Colors.BRAND_PRIMARY}
                                />
                            </View>
                            <View style={styles.flex1}>
                                {isDeleting ? (
                                    <View style={styles.loaderWrapper}>
                                        <CustomLoader size={40} />
                                    </View>
                                ) : (
                                    <CustomButton
                                        title="Confirm & Delete"
                                        onPress={handleSubmit}
                                        width="100%"
                                        height={hp(44)}
                                        borderRadius={100}
                                        secondaryColor="#FE4C5D"
                                        primaryColor="#DC3545"
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                </AnimatedModal>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
    card: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 18,
        paddingHorizontal: wp(22),
        paddingTop: hp(30),
        paddingBottom: hp(24),
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    cardLeft: { alignItems: 'flex-start' },
    iconPlaceholder: {
        backgroundColor: "#EF44441A",
        alignItems: "center",
        justifyContent: "center",
        height: 52,
        width: 52,
        borderRadius: 12,
        marginBottom: hp(16)
    },
    title: {
        // fontWeight: '700',
        marginBottom: hp(10),
        textAlign: 'center'
    },
    body: {
        lineHeight: 21,
        textAlign: 'center',
        marginBottom: hp(20)
    },
    title2: {
        fontSize: fp(16),
        // fontWeight: '700',
        marginBottom: hp(20)
    },
    inputWrapper: {
        width: '100%',
        marginBottom: hp(10)
    },
    warnBanner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 10,
        padding: 12,
        gap: 10,
        marginBottom: hp(20),
        backgroundColor: "#EF444408"
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
        lineHeight: 18
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        gap: 12
    },
    flex1: {
        flex: 1
    },
    loaderWrapper: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    }
});