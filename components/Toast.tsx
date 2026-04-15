import { hp } from '@/utils/responsive';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { Body1 } from './typo/Typography';

type ToastType = 'success' | 'error' | 'info';

interface ToastState {
    message: string;
    type: ToastType;
    visible: boolean;
}

let toastRef: ((config: { message: string; type?: ToastType; duration?: number }) => void) | null = null;

export const showToast = (message: string, type: ToastType = 'info', duration = 2000) => {
    toastRef?.({ message, type, duration });
};

export default function Toast() {
    const [state, setState] = useState<ToastState>({ message: '', type: 'info', visible: false });
    const opacity = useRef(new Animated.Value(0)).current;
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        toastRef = ({ message, type = 'info', duration = 2000 }) => {
            if (timer.current) clearTimeout(timer.current);

            setState({ message, type, visible: true });

            Animated.sequence([
                Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.delay(duration),
                Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
            ]).start(() => setState(prev => ({ ...prev, visible: false })));
        };

        return () => { toastRef = null; };
    }, []);

    if (!state.visible) return null;

    const bgColor =
        state.type === 'success' ? '#822CE7' :
        state.type === 'error'   ? '#FE4C5D' :
                                   '#1565C0';

    return (
        <Animated.View style={[styles.toast, { opacity, backgroundColor: bgColor }]}>
            <View style={styles.row}>
                <Image
                    source={require('@/assets/images/icon.png')}
                    style={styles.icon}
                    resizeMode="contain"
                />
                <Body1 style={styles.text}>{state.message}</Body1>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        bottom: hp(200),
        left: 20,
        right: 20,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        elevation: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    icon: {
        width: 28,
        height: 28,
        borderRadius: 6,
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        flex: 1,       
    },
});