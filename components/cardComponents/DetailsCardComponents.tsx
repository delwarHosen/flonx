import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Body3, Caption2 } from '../typo/Typography';

interface DetailsItemProps {
    topLabel:string;
    bottomLabel:string;
    onPress?: () => void;
    style?: ViewStyle;
    textColor?: string,
    borderColor?: string,
}

export const DetailsCardComponents: React.FC<DetailsItemProps> = ({
    topLabel,
    bottomLabel,
    onPress,
    style,
    textColor,
    borderColor,
}) => {

    return (
        <TouchableOpacity
            style={[styles.buttonContainer, style, { borderColor: borderColor ?? Colors.BORDER_COLOR }]}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View style={{
            }}>
                <Caption2 style={{ marginBottom: 12 }} color={Colors.PLACEHOLLDER_TEXT}>{topLabel}</Caption2>
                <Body3 color={textColor ? textColor : Colors.NEUTRAL0} >{bottomLabel}</Body3>
            </View>

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
    
});