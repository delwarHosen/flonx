
import PaymentSuccessScreen from '@/components/CommonComponents/PaymentSuccessScreenCustomer'
import { Colors } from '@/constants/theme'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PaymentSuccess() {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <PaymentSuccessScreen />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: Colors.NEUTRAL0,

    }
})