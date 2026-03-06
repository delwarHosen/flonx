import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents'
import SectionTitle from '@/components/SectionTitle'
import { Colors } from '@/constants/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function  LegalCompanyInfo() {
    return (
        <SafeAreaView
            style={styles.safeAreaContainer}
        >
            <View>
                <SectionTitle
                    title='Legal & Company Info'
                />
            </View>
            <View style={styles.detailsContainer}>
                <DetailsCardComponents
                topLabel="Company Name"
                bottomLabel="FLŌNX Inc."
                />

                <DetailsCardComponents
                topLabel="Business Type"
                bottomLabel="Technology Platform"
                />

                <DetailsCardComponents
                topLabel="Registered Address"
                bottomLabel="Currently not available"
                />

                <DetailsCardComponents
                topLabel="Contact Email"
                bottomLabel="support@flonx.app"
                />

                <DetailsCardComponents
                topLabel="Jurisdiction"
                bottomLabel="United States"
                />

                <DetailsCardComponents
                topLabel="Official Website"
                bottomLabel="http://www.flonx.com"
                />
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1, backgroundColor: Colors.APP_BACKGROUND
    },
   detailsContainer:{
    paddingHorizontal:"5%",
    marginTop:20
   }
})