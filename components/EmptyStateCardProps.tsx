import { IMAGE_COMPONENTS } from '@/constants/image.index';
import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Body3 } from './typo/Typography';

interface EmptyStateCardProps {
    message: string;
    containerStyle?: StyleProp<ViewStyle>;
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
    message,
    containerStyle,
}) => {
    return (
        <View style={[styles.emptyCard, containerStyle]}>
            <View style={styles.emptyIconContainer}>
                <Image
                    source={IMAGE_COMPONENTS.emptyImg}
                    style={{ height: 50, width: 80 }}
                    contentFit='cover' />
            </View>

            <Body3 italic color={Colors.PLACEHOLLDER_TEXT} align="center">
                {message}
            </Body3>
        </View>
    );
};

export default EmptyStateCard;

const styles = StyleSheet.create({
    emptyCard: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 12,
        padding:24,
        // paddingVertical: 40,
        // paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyIconContainer: {
        marginBottom: 12,
        opacity: 0.8,
    },
});