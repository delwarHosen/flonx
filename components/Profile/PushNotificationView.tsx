import CustomToggleButton from '@/components/CustomToggleButton';
import SectionTitle from '@/components/SectionTitle';
import { Body3, Caption3 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PushNotificationView = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleSwitch = async () => {
        const previousState = isEnabled;
        const newValue = !isEnabled;

        
        setIsEnabled(newValue);

        try {
            setLoading(true);
            
            
            await new Promise(resolve => setTimeout(resolve, 1000));

            ToastAndroid.show(
                `Notification ${newValue ? 'Enabled' : 'Disabled'}`, 
                ToastAndroid.SHORT
            );
        } catch (error) {
            
            setIsEnabled(previousState);
            ToastAndroid.show("Failed to update settings", ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeareContainer}>
            <View style={{ paddingVertical: "4%" }}>
                <SectionTitle title='Push Notification' />
            </View>
            <View style={{ paddingHorizontal: "5%" }}>
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