import CustomToggleButton from '@/components/CustomToggleButton';
import SectionTitle from '@/components/SectionTitle';
import { Body3, Caption3 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PushNotification = () => {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={styles.safeareContainer}>
            <View>
                <SectionTitle
                    title='Push Notification'
                />
            </View>
            <View style={{ paddingHorizontal: "5%",marginTop:10 }}>
                
                <View style={styles.card}>
                    <View style={styles.textContainer}>
                        <Body3 italic color={Colors.NEUTRAL0} style={styles.title}>Push Notification Preferences</Body3>
                        <Caption3 color={Colors.PLACEHOLLDER_TEXT} style={styles.description}>
                            Receive important updates about your properties, payments, projects, and account activity.
                        </Caption3>
                    </View>
                    <CustomToggleButton
                        value={isEnabled}
                        onValueChange={toggleSwitch}
                        // style={styles.switch}
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
    title: {
        fontWeight: '600',
    },
    description: {
        lineHeight: 15,
        maxWidth: "80%",
    },
    // switch: {
    //     borderWidth: 1,
    //     borderColor: "white"
    //     // switch styling would be specific to your platform and libraries
    // },
});

export default PushNotification;

