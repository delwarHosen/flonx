import { Colors } from '@/constants/theme';
import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body3, Caption3 } from '../typo/Typography';

interface ProfileInfoItemProps {
    icon?: ReactNode;
    label: string;
    value: string;
    onPress?: () => void;
}

export const ProfileDetailsCard: React.FC<ProfileInfoItemProps> = ({
    icon,
    label,
    value,
    onPress,
}) => {

   
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            disabled={!onPress}
            style={styles.container}
        >
            {/* Left Side: Icon + Label + Value */}
            <View style={styles.leftSection}>
                {icon && (
                    <View style={styles.iconContainer}>
                        {icon}
                    </View>
                )}
                <View style={styles.textContainer}>
                    <Caption3 italic color={Colors.PLACEHOLLDER_TEXT} style={{ marginBottom: 6 }}>
                        {label}
                    </Caption3>
                    <Body3 color={Colors.NEUTRAL0}>
                        {value}
                    </Body3>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 10,
        marginBottom: 10,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,

    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY,
        backgroundColor: Colors.INPUT_BACKGROUND,
    },
    textContainer: {
        flexDirection: 'column',
    },
});