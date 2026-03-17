import { Colors } from '@/constants/theme';
import { hp } from '@/utils/responsive';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../CustomButton';
import SectionTitle from '../SectionTitle';
import Typography, { Body3, H4 } from '../typo/Typography';

interface TipSelectionProps {
    customTipRoute: string;
    continueRoute: string;
    skipRoute: string;
    primaryColor?: string;
}

const TipSelectionContent: React.FC<TipSelectionProps> = ({
    customTipRoute,
    continueRoute,
    skipRoute,
    primaryColor = Colors.BRAND_PRIMARY_LIGHT
}) => {
    const router = useRouter();
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const tipOptions = [5, 10, 15, 20];

    // Responsive measurements
    const { width } = useWindowDimensions();
    const dynamicPadding = width > 400 ? 30 : 25;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={{ marginVertical: hp(15) }}>
                <SectionTitle />
            </View>

            <View style={[styles.content, { paddingHorizontal: dynamicPadding }]}>
                <H4 color={Colors.NEUTRAL0} align="center">Tip Your Bartender</H4>
                <Body3 color={Colors.PLACEHOLLDER_TEXT} align="center" style={{ marginTop: hp(10), marginBottom: hp(24) }}>
                    Show Your Appreciation
                </Body3>

                {tipOptions.map((amount) => (
                    <TouchableOpacity
                        key={amount}
                        onPress={() => setSelectedAmount(amount)}
                        style={[
                            styles.tipOption,
                            selectedAmount === amount && { borderColor: primaryColor }
                        ]}
                    >
                        <Typography
                            variant="h5"
                            weight="bold"
                            color={primaryColor}
                            align="center"
                        >
                            ${amount}
                        </Typography>
                    </TouchableOpacity>
                ))}

                <View style={styles.actionRow}>
                    <View style={styles.buttonWrapper}>
                        <CustomButton
                            title="Custom"
                            onPress={() => router.push(customTipRoute as any)}
                            width="100%"
                            height={hp(44)}
                            borderRadius={100}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <CustomButton
                            title="Continue"
                            onPress={() => router.push(continueRoute as any)}
                            width="100%"
                            height={hp(44)}
                            borderRadius={100}
                        />
                    </View>
                </View>

                <CustomButton
                    title="Skip"
                    onPress={() => router.push(skipRoute as any)}
                    width="100%"
                    height={hp(44)}
                    borderRadius={100}
                    backgroundColor={Colors.NEUTRAL0}
                    color={primaryColor}
                    style={{ marginTop: hp(16) }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND
    },
    content: {
        flex: 1,
    },
    tipOption: {
        width: '100%',
        paddingVertical: hp(10),
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: Colors.INPUT_BACKGROUND,
        marginBottom: hp(16),
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16
    },
    buttonWrapper: { flex: 1 },
});

export default TipSelectionContent;