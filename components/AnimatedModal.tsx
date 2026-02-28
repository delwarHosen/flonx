import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';

export const AnimatedModal: React.FC<{ visible: boolean; children: React.ReactNode }> = ({
    visible,
    children,
}) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.9)).current;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (visible) {
            setMounted(true);
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, tension: 120, friction: 10, useNativeDriver: true }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(opacity, { toValue: 0, duration: 160, useNativeDriver: true }),
                Animated.timing(scale, { toValue: 0.9, duration: 160, useNativeDriver: true }),
            ]).start(() => setMounted(false));
        }
    }, [visible]);

    if (!mounted) return null;

    return (
        <Modal 
            transparent 
            visible={visible} 
            animationType="none" 
            statusBarTranslucent
            onRequestClose={() => Keyboard.dismiss()}
        >
            <KeyboardAvoidingView
                
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Animated.View style={[styles.overlay, { opacity }]}>
                      
                        <ScrollView 
                            contentContainerStyle={styles.scrollContent}
                            bounces={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            <Animated.View style={[styles.centeredView, { transform: [{ scale }] }]}>
                                {children}
                            </Animated.View>
                        </ScrollView>
                        
                    </Animated.View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.72)',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 28,
    },
    centeredView: {
        width: '100%',
        alignItems: 'center',
    },
});