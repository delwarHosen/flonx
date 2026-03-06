
import OrderSuccessComponent from '@/components/CommonComponents/OrderSuccessComponentCustomer'
import { Colors } from '@/constants/theme'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function OrderSuccess() {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <OrderSuccessComponent/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: Colors.NEUTRAL0,

    }
})