import { Colors } from '@/constants/theme';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Pressable,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';

interface CustomToggleProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    style?: StyleProp<ViewStyle>;
}

const TRACK_WIDTH = 60;
const TRACK_HEIGHT = 30;
const THUMB_SIZE = 20;
const THUMB_PADDING = 3;

const CustomToggleButton: React.FC<CustomToggleProps> = ({ value, onValueChange, style }) => {
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: value ? 1 : 0,
            duration: 220,
            useNativeDriver: false,
        }).start();
    }, [value]);

    const thumbTranslateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [THUMB_PADDING, TRACK_WIDTH - THUMB_SIZE - THUMB_PADDING],
    });

    const trackColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.APP_BACKGROUND, Colors.BRAND_PRIMARY],
    });

    return (
        <Pressable onPress={() => onValueChange(!value)} style={style}>
            <Animated.View
                style={[
                    styles.track,
                    { backgroundColor: trackColor },
                ]}
            >
                <Animated.View
                    style={[
                        styles.thumb,
                        { transform: [{ translateX: thumbTranslateX }] },
                    ]}
                />
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    track: {
        width: TRACK_WIDTH,
        height: TRACK_HEIGHT,
        borderRadius: 999,
        borderWidth: 3,
        borderColor: Colors.BRAND_PRIMARY,
        justifyContent: 'center',
    },
    thumb: {
        position: 'absolute',
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        backgroundColor: Colors.BRAND_PRIMARY,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 3,
        elevation: 4,
    },
});

export default CustomToggleButton;