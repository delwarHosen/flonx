import { CardPaypleIcon } from '@/assets/images/icons/BarRelatedIcon/CardStripeIcon';
import { CrossIcon } from '@/assets/images/icons/BarRelatedIcon/CrossIcon';
import { GoogleIcon } from '@/assets/images/icons/BarRelatedIcon/GoogleIcon';
import { LockIcon } from '@/assets/images/icons/BarRelatedIcon/LockIcon';
import { AppleIcon } from '@/assets/images/icons/icon';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton } from '../CustomButton';
import { Body2, ButtonText, Caption1 } from '../typo/Typography';

const PaymentType = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets(); // iOS notch and home bar handle korar jonno

    return (
        // edges feature manually handling through style for better control
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <StatusBar barStyle="dark-content" />

            {/* Header / Close Button */}
            <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : 10 }}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.closeButton}>
                    <CrossIcon />
                </TouchableOpacity>
            </View>

            <View style={[
                styles.content,
                { paddingBottom: insets.bottom + 20 } // Bottom spacing for iPhone Home Indicator
            ]}>
                
                {/* Google Pay Button */}
                <CustomButton
                    title=""
                    onPress={() => console.log("Google Pay")}
                    width="100%"
                    height={55} 
                    borderRadius={8}
                    backgroundColor='#000000'
                    style={{ marginBottom: 12 }} 
                    icon={
                        <View style={styles.buttonInner}>
                            <GoogleIcon />
                            <ButtonText color={Colors.NEUTRAL0} style={styles.payText}>PAY</ButtonText>
                        </View>
                    }
                />

                {/* Apple Pay Button */}
                <CustomButton
                    title=""
                    onPress={() => console.log("Apple Pay")}
                    width="100%"
                    height={55}
                    borderRadius={8}
                    backgroundColor='#000000'
                    icon={
                        <View style={styles.buttonInner}>
                            <AppleIcon />
                            <ButtonText color={Colors.NEUTRAL0} style={styles.payText}>PAY</ButtonText>
                        </View>
                    }
                />

                {/* Divider */}
                <View style={styles.dividerContainer}>
                    <View style={styles.line} />
                    <Caption1 color={"#8C88A3"} style={styles.dividerText}>or pay using</Caption1>
                    <View style={styles.line} />
                </View>

                {/* Card Input Field */}
                <TouchableOpacity style={styles.cardSelector}>
                    <View style={styles.cardRow}>
                        <CardPaypleIcon />
                        <Body2 color={Colors.PLACEHOLLDER_TEXT} style={styles.cardText}>Card</Body2>
                    </View>
                </TouchableOpacity>

                {/* Main Action Button (Blue) */}
                <TouchableOpacity 
                    style={styles.mainSubmitButton}
                    onPress={() => router.push("/guest/payment-success")}
                >
                    <View style={{ width: 24 }} /> 
                    <ButtonText color={Colors.NEUTRAL0} style={styles.submitButtonText}>Pay $89.00</ButtonText>
                    <LockIcon color={Colors.NEUTRAL0} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    closeButton: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        // Android top padding handle kora hoyeche View diye
    },
    content: {
        flex: 1, // Full screen height use korbe
        paddingHorizontal: 20, 
        justifyContent: 'flex-start', // Button gulo upore thakbe
    },
    buttonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    payText: {
        letterSpacing: 1,
        fontWeight: '700',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30, 
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E5E5', // Slightly lighter line for better contrast
    },
    dividerText: {
        marginHorizontal: 12,
        textTransform: 'lowercase',
    },
    cardSelector: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 10,
        padding: 18,
        marginBottom: 25,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardText: {
        marginLeft: 12,
        fontSize: 16,
    },
    mainSubmitButton: {
        backgroundColor: '#007AFF',
        height: 55,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: 20,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 3,
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: '600',
    },
});

export default PaymentType;