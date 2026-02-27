import { RightAngleIcon } from '@/assets/images/icons/ProfileInfoIcons/RightAngleIcon';
import { Colors } from '@/constants/theme';
import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Body3 } from '../typo/Typography';

interface ProfileItemProps {
    icon: ReactNode;
    label: string;
    onPress: () => void;
    style?: ViewStyle;
    textColor?: string,
    borderColor?: string,
    iconBG?: string
}

export const ProfileCard: React.FC<ProfileItemProps> = ({
    icon,
    label,
    onPress,
    style,
    textColor,
    borderColor,
    iconBG
}) => {

    return (
        <TouchableOpacity
            style={[styles.buttonContainer, style, { borderColor: borderColor ?? Colors.BORDER_COLOR }]}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center"
            }}>
                <View style={[styles.icon, { backgroundColor: iconBG ?? "#822CE71A" }]}>
                    {icon}
                </View>
                <Body3 color={textColor ? textColor : Colors.PLACEHOLLDER_TEXT} >{label}</Body3>
            </View>
            <RightAngleIcon size={16} color={Colors.PLACEHOLLDER_TEXT} />
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    },
    icon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        height: 30,
        width: 30,
    }
});