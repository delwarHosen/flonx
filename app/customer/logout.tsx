import { Colors } from '@/constants/theme'
import React from 'react'
import { Text, View } from 'react-native'

export default function LogoutScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.APP_BACKGROUND }}>
            <Text style={{ color: Colors.NEUTRAL0 }}>Logout screen</Text>
        </View>
    )
}