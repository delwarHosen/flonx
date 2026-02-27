import { Colors } from '@/constants/theme'
import React from 'react'
import { Text, View } from 'react-native'

export default function TermCondition() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.APP_BACKGROUND }}>
            <Text style={{ color: Colors.NEUTRAL0 }}>term-and-condition</Text>
        </View>
    )
}