import CustomToggleButton from '@/components/CustomToggleButton';
import SectionTitle from '@/components/SectionTitle';
import { Body3, Caption3 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, Platform, StyleSheet, ToastAndroid, View } from 'react-native';
import { OneSignal } from 'react-native-onesignal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showToast } from '../Toast';

const PushNotificationView = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const appState = useRef(AppState.currentState);

    const checkPermission = async () => {
        const permission = await OneSignal.Notifications.getPermissionAsync();
        const subbed = OneSignal.User.pushSubscription.getOptedIn();
        setIsEnabled(permission && subbed);
    };

    // mount এ check
    useEffect(() => {
        checkPermission();
    }, []);

    // background → foreground এ আসলে re-check
    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                checkPermission();
            }
            appState.current = nextAppState;
        });

        return () => subscription.remove();
    }, []);

    const toggleSwitch = async () => {
        const previousState = isEnabled;
        const newValue = !isEnabled;

        setIsEnabled(newValue);

        try {
            setLoading(true);

            if (newValue) {
                const granted = await OneSignal.Notifications.requestPermission(true);
                if (granted) {
                    OneSignal.User.pushSubscription.optIn();
                } else {
                    setIsEnabled(false);
                    if (Platform.OS === 'android') {
                        ToastAndroid.show(
                            'Please enable notifications from device settings',
                            ToastAndroid.SHORT
                        );
                    }
                    return;
                }
            } else {
                OneSignal.User.pushSubscription.optOut();
            }

            showToast(`Notification ${newValue ? 'Enabled' : 'Disabled'}`)
        } catch (error) {
            setIsEnabled(previousState);
            showToast("Failed to update settings")
           
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeareContainer}>
            <View style={{ paddingVertical: hp(20) }}>
                <SectionTitle title='Push Notification' />
            </View>
            <View style={{ paddingHorizontal: wp(20) }}>
                <View style={[styles.card, loading && { opacity: 0.7 }]}>
                    <View style={styles.textContainer}>
                        <Body3 italic color={Colors.NEUTRAL0} style={styles.title}>
                            Push Notification Preferences
                        </Body3>
                        <Caption3 color={Colors.PLACEHOLLDER_TEXT} style={styles.description}>
                            Receive important updates about your properties, payments, projects, and account activity.
                        </Caption3>
                    </View>

                    <CustomToggleButton
                        value={isEnabled}
                        onValueChange={toggleSwitch}
                        disabled={loading}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeareContainer: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    card: {
        borderRadius: 14,
        padding: 16,
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderColor: Colors.BORDER_COLOR,
        borderWidth: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 12,
    },
    title: {},
    description: {
        lineHeight: 15,
        maxWidth: "80%",
    },
});

export default PushNotificationView;