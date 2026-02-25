import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { ButtonText } from './typo/Typography';

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    icon?: React.ReactNode;
    style?: ViewStyle;
    secondaryColor?: string;
    primaryColor?: string;
    width?: number | string;
    height?: number;
    borderRadius?: number;
}

export const CustomButton = ({
    onPress,
    title,
    icon,
    style,
    secondaryColor = Colors.BRAND_PRIMARY_LIGHT,
    primaryColor = Colors.BRAND_PRIMARY,
    width = 120,
    height = 44,
    borderRadius = 100,
}: CustomButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <LinearGradient
                colors={[primaryColor, secondaryColor]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 1, y: -1 }}
                style={[styles.button, { width, height, borderRadius } as any, style]}
            >
                <ButtonText color={Colors.NEUTRAL0}>{title}</ButtonText>
                {icon && icon}
            </LinearGradient>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginTop:16
    },
});