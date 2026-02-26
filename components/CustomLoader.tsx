import { Colors } from '@/constants/theme';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

interface Props {
    size?: number;
    strokeWidth?: number;
    color?: string;
}

export default function CustomLoader({
    size = 40,
    strokeWidth = 5,
    color = Colors.BRAND_PRIMARY,
}: Props) {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 900,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View
            style={{
                width: size,
                height: size,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Animated.View
                style={[
                    styles.loader,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        borderWidth: strokeWidth,
                        borderColor: '#E5E5E5',
                        borderTopColor: color,
                        transform: [{ rotate }],
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loader: {
        borderStyle: 'solid',
    },
});
