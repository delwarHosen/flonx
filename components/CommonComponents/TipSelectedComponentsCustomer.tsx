import React, { useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../CustomButton';
import SectionTitle from '../SectionTitle';
import Typography, { Body3, H4 } from '../typo/Typography';

const TipSelectedComponents = () => {
    const router = useRouter();
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

    const tipOptions = [5, 10, 15, 20];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Back Button */}
            <View style={styles.header}>
                <SectionTitle />
            </View>

            <View style={styles.content}>
                {/* Title Section */}
                <H4 color={Colors.NEUTRAL0} align="center">Tip Your Bartender</H4>
                <Body3 color={Colors.PLACEHOLLDER_TEXT} align="center" style={{ marginTop: 10, marginBottom: 24 }}>
                    Show Your Appreciation
                </Body3>

                {/* Tip Selection List */}
                {tipOptions.map((amount) => (
                    <TouchableOpacity
                        key={amount}
                        onPress={() => setSelectedAmount(amount)}
                        style={[
                            styles.tipOption,
                            selectedAmount === amount && styles.selectedTipOption
                        ]}
                    >
                        <Typography
                            variant="h5"
                            weight="bold"
                            color={selectedAmount === amount ? Colors.BRAND_PRIMARY_LIGHT : Colors.BRAND_PRIMARY_LIGHT}
                            align="center"
                        >
                            ${amount}
                        </Typography>
                    </TouchableOpacity>
                ))}

                {/* Action Buttons (Custom & Continue) */}
                <View style={styles.actionRow}>
                    <View style={styles.buttonWrapper}>
                        <CustomButton
                            title="Custom"
                            onPress={() => router.push("/customer/items/custom-tip-seleted")}
                            width="100%"
                            height={44}
                            borderRadius={100}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <CustomButton
                            title="Continue"
                            onPress={() => router.push('/customer/items/payment-type')}
                            width="100%"
                            height={44}
                            borderRadius={100}
                        />
                    </View>
                </View>

                {/* Skip Button */}
                <CustomButton
                    title="Skip"
                    onPress={() => router.push('/customer/items/shop-items')}
                    width="100%"
                    height={44}
                    borderRadius={100}
                    backgroundColor={Colors.NEUTRAL0}
                    color={Colors.BRAND_PRIMARY_LIGHT}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    header: {
        paddingTop: 20,
    },
    backButton: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: Colors.ICON_BG_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    tipOption: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: Colors.INPUT_BACKGROUND,
        marginBottom: 16,
    },
    selectedTipOption: {
        borderColor: Colors.BRAND_PRIMARY_LIGHT,
        borderWidth: 1,
    },
    actionRow: {
        flexDirection: 'row',
        // marginTop: 20,
        justifyContent: 'space-between',
        gap:16
    },
    flex1: {
        flex: 1,
    },
    gradientButton: {
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    skipButton: {
        width: '100%',
        backgroundColor: Colors.NEUTRAL0,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
     buttonWrapper: {
        flex: 1,
    },
});

export default TipSelectedComponents;