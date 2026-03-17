import { CustomButton } from "@/components/CustomButton";
import { Body1, Caption1 } from "@/components/typo/Typography";
import { Colors } from "@/constants/theme";
import { hp, wp } from "@/utils/responsive";
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedModal } from './AnimatedModal';

interface ConfirmationModalProps {
    visible: boolean;
    icon?: React.ReactNode;
    title: string;
    description: string;
    cancelText?: string;
    confirmText?: string;
    onCancel: () => void;
    onConfirm: () => void;
    confirmColor?: string;
    confirmSecondaryColor?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    visible,
    icon,
    title,
    description,
    cancelText = "Cancel",
    confirmText = "Confirm",
    onCancel,
    onConfirm,
    confirmColor = "#DC3545",
    confirmSecondaryColor = "#FE4C5D",
}) => {

    

    return (
        <AnimatedModal visible={visible}>
            <View style={styles.card}>
                {icon && (
                    <View style={styles.iconPlaceholder}>
                        {icon}
                    </View>
                )}

                <Body1 color={Colors.NEUTRAL0} style={styles.title}>
                    {title}
                </Body1>

                <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.body}>
                    {description}
                </Caption1>

                <View style={styles.buttonRow}>
                    <View style={styles.flex1}>
                        <CustomButton
                            title={cancelText}
                            onPress={onCancel}
                            width="100%"
                            height={hp(44)}
                            borderRadius={100}
                            backgroundColor="transparent"
                            borderColor={Colors.COLOR_DANGER}
                            color={Colors.COLOR_DANGER}
                        />
                    </View>
                    <View style={styles.flex1}>
                        <CustomButton
                            title={confirmText}
                            onPress={onConfirm}
                            width="100%"
                            height={hp(44)}
                            borderRadius={100}
                            secondaryColor={confirmSecondaryColor}
                            primaryColor={confirmColor}
                        />
                    </View>
                </View>
            </View>
        </AnimatedModal>
    );
};

const styles = StyleSheet.create({
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
    iconPlaceholder: {
        backgroundColor: "#EF44441A",
        alignItems: "center",
        justifyContent: "center",
        height: hp(52),
        width: wp(52),
        borderRadius: 10,
        marginBottom: hp(16),
    },
    title: {
        // fontWeight: '700',
        marginBottom: hp(10),
        textAlign: 'center',
    },
    body: {
        lineHeight: 21,
        textAlign: 'center',
        marginBottom: hp(20),
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