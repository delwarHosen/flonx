import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { Body1, Body2, Caption1, Caption3, H5 } from './typo/Typography';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SaveCardPermissionModalProps {
    visible: boolean;
    last4: string;
    brand: string;
    onSave: () => void;
    onSkip: () => void;
}

const SaveCardPermissionModal: React.FC<SaveCardPermissionModalProps> = ({
    visible,
    last4,
    brand,
    onSave,
    onSkip,
}) => {
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 280,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    damping: 20,
                    stiffness: 180,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
                Animated.timing(slideAnim, { toValue: SCREEN_HEIGHT, duration: 200, useNativeDriver: true }),
            ]).start();
        }
    }, [visible]);

    return (
        <Modal visible={visible} transparent animationType="none">
            <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />

            <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
                {/* Handle */}
                <View style={styles.handle} />

                {/* Card Icon */}
                <View style={styles.iconWrapper}>
                    <Body1 style={{ fontSize: 36 }}>💳</Body1>
                </View>

                {/* Title */}
                <H5 color={Colors.NEUTRAL0} style={styles.title}>
                    Save Card for Later?
                </H5>

                {/* Description */}
                <Body2 color={Colors.PLACEHOLLDER_TEXT} style={styles.desc}>
                    Would you like to save your{' '}
                    <Body2 color={Colors.NEUTRAL0} style={{ fontWeight: '700' }}>
                        {brand.toUpperCase()} •••• {last4}
                    </Body2>{' '}
                    for faster checkout next time?
                </Body2>

                <Caption3 color={Colors.PLACEHOLLDER_TEXT} style={styles.note}>
                    You can remove saved cards anytime from your profile.
                </Caption3>

                {/* Save Button */}
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={onSave}
                    style={styles.saveBtn}
                >
                    <Body1 color={Colors.BRAND_PRIMARY} style={{ fontWeight: '700' }}>
                        Yes, Save Card
                    </Body1>
                </TouchableOpacity>

                {/* Skip Button */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onSkip}
                    style={styles.skipBtn}
                >
                    <Caption1 color={Colors.PLACEHOLLDER_TEXT}>
                        No thanks, don't save
                    </Caption1>
                </TouchableOpacity>

                <View style={{ height: hp(24) }} />
            </Animated.View>
        </Modal>
    );
};

export default SaveCardPermissionModal;

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.65)',
    },
    sheet: {
        position: 'absolute',
        bottom: 40,
        left: 12,
        right: 12,
        backgroundColor: '#1A1530',
        borderRadius: 28,
        paddingHorizontal: wp(20),
        paddingTop: hp(12),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 20,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#3A3058',
        marginBottom: hp(20),
    },
    iconWrapper: {
        width: 72,
        height: 72,
        borderRadius: 20,
        backgroundColor: Colors.BRAND_PRIMARY + '18',
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY + '40',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(16),
    },
    title: {
        fontWeight: '700',
        marginBottom: hp(10),
        textAlign: 'center',
    },
    desc: {
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: wp(10),
        marginBottom: hp(8),
    },
    note: {
        textAlign: 'center',
        paddingHorizontal: wp(10),
        marginBottom: hp(24),
        lineHeight: 18,
    },
    saveBtn: {
        backgroundColor: Colors.NEUTRAL0,
        borderRadius: 100,
        paddingVertical: hp(15),
        width: '100%',
        alignItems: 'center',
        marginBottom: hp(12),
    },
    skipBtn: {
        paddingVertical: hp(10),
        width: '100%',
        alignItems: 'center',
    },
});