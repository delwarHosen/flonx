import { Colors } from '@/constants/theme';
import { fp, hp, wp } from '@/utils/responsive';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import CustomLoader from './CustomLoader';

interface CustomButtonProps {
    onPress: () => void;
    title?: string;
    icon?: React.ReactNode;
    style?: ViewStyle;
    secondaryColor?: string;
    primaryColor?: string;
    backgroundColor?: string;
    color?: string; // 1. Add this to your interface
    width?: number | string;
    height?: number;
    borderRadius?: number;
    borderColor?: string;
    disabled?: boolean; // Ei line-ti add korun
    isLoading?: boolean
}

export const CustomButton = ({
    onPress,
    title,
    icon,
    style,
    secondaryColor = Colors.BRAND_PRIMARY_LIGHT,
    primaryColor = Colors.BRAND_PRIMARY,
    backgroundColor,
    color = "white",
    width = wp(120),
    height = hp(44),
    borderRadius = 100,
    borderColor,
    disabled,
    isLoading
}: CustomButtonProps) => {

    // Logic for background colors (ensuring tuple for TS)
    const finalColors: [string, string, ...string[]] = backgroundColor
        ? [backgroundColor, backgroundColor]
        : [primaryColor, secondaryColor];

    // 3. Logic for text color: Use the prop if provided, otherwise fallback to White
    const finalTextColor = color || Colors.NEUTRAL0;

    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.8} style={{ borderRadius }}>
            <LinearGradient
                colors={finalColors}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 1, y: -1 }}
                style={[styles.button, {
                    width, height, borderRadius, borderWidth: borderColor ? 1 : 0,
                    borderColor: borderColor,
                    overflow: 'hidden',
                } as any, style]}
            >
                {/* 4. Pass the finalTextColor to ButtonText */}
                {title ? <Text style={{ fontFamily: "Nunito_600SemiBold", color, fontSize: fp(14), alignSelf: "center" }} >{isLoading && <CustomLoader size={16} />} {title}</Text> : null}
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
        // marginTop: hp(16),

        // Add this
        padding: 0,
    },
});