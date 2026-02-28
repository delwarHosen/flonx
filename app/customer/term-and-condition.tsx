import SectionTitle from '@/components/SectionTitle'
import { Body1, Caption1 } from '@/components/typo/Typography'
import { Colors } from '@/constants/theme'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function TermCondition() {
    return (
        <SafeAreaView
            style={styles.safeAreaContainer}
        >
            <View>
                <SectionTitle
                    title='Terms & Condition'
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.textContainer}>
                    <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>Terms & Conditions</Body1>

                    <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>Terms & Conditions {"\n"}
                        Last Updated: 14 March 2026</Caption1>

                    <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>By accessing or using FLŌNX, you agree to comply with and be bound by these Terms & Conditions.</Caption1>



                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Acceptance of Terms</Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>By using the platform, creating an account, or placing an order, you confirm that you have read, understood, and accepted these Terms. If you do not agree, you should discontinue use of the platform.

                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Purpose of the Platform
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>FLŌNX provides a digital ordering system for bars, a bartender marketplace, and discovery features for users. FLŌNX does not sell alcohol, operate venues, or employ bartenders.

                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● User Accounts
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            Registered users, bartenders, and venue owners are responsible for maintaining the confidentiality of their account credentials and for all activity under their account.

                        </Caption1>

                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Guest Usage
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            Users may place orders as guests without creating an account. Certain features such as order history, event hiring, and bartender marketplace access require account registration.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Payments and Tips
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            All payments are processed through third-party payment providers. Tips are optional and are paid directly to bartenders. FLŌNX does not guarantee payments beyond the defined platform flow.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Alcohol Disclaimer
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            Alcoholic beverages are sold and served solely by licensed venues. Users are responsible for complying with all applicable laws regarding alcohol consumption and age restrictions.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Marketplace and Gigs
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            FLŌNX provides tools for venues and customers to post jobs and for bartenders to apply. FLŌNX is not a party to employment or gig agreements and does not guarantee job availability or performance.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Acceptable Use
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            You agree not to misuse the platform, attempt unauthorized access, or engage in fraudulent or harmful activity.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Intellectual Property
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            All designs, content, trademarks, and materials on the platform are owned by FLŌNX or its licensors and may not be used without permission.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Limitation of Liability
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            FLŌNX is not responsible for indirect, incidental, or consequential damages arising from platform use, venue operations, or gig arrangements.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Changes to Terms
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            We may update these Terms at any time. Continued use of the platform indicates acceptance of the updated Terms.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Governing Law
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            These Terms are governed by the laws of the United States.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Contact
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            For questions regarding these Terms, please contact us through the in-app support section.
                        </Caption1>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1, backgroundColor: Colors.APP_BACKGROUND
    },
    scrollContainer: {
        flexGrow: 1,
        // paddingHorizontal: "5%",
        marginTop: 10,
        paddingBottom: 20
    },
    textContainer: {
        paddingHorizontal: "5%",
        marginTop: 16
    },
    textContent: {
        marginBottom: 20,
        lineHeight: 18
    }
})