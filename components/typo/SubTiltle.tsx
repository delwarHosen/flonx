import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption1, Caption2 } from './Typography';

interface SubTitleProps {
    text: string;
    size: 'small' | 'medium' | 'large';
    color?: string;
    note?: string;
}

export const SubTiltle: React.FC<SubTitleProps> = ({
    text,
    size = "regular",
    color = "#B0B0B0",
    note
}) => {

    const getFontSize = () => {
        switch (size) {
            case "small": return 12;
            case "medium": return 14;
            case "large": return 16;
            default: return 14;
        }
    }

    return (
        <View style={styles.container}>
            <Caption1 color={color} style={{ fontSize: getFontSize() }}>
                {text}
            </Caption1>
            {note && (
                <Caption2 color="#EF4444" style={styles.note}>
                    {note}
                </Caption2>
            )}
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    note: {
        marginTop: 4,
    },
});