import SectionTitle from '@/components/SectionTitle'
import { Body1, Caption1 } from '@/components/typo/Typography'
import { Colors } from '@/constants/theme'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PrivecyPolicy() {
    return (
        <SafeAreaView
            style={styles.safeAreaContainer}
        >
            <View>
                <SectionTitle
                    title='Privacy policy'
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.textContainer}>
                    <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>Privacy Policy</Body1>

                    <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>Privacy Policy {"\n"}
                        Last Updated: 14 March 2026</Caption1>

                    <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>Your privacy is important to us. This Privacy Policy explains how FLŌNX collects, uses, and protects your information when you use our web app, mobile applications, and related service</Caption1>



                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Information We Collect
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>We may collect personal information such as your name, email address, profile details, and account credentials when you create an account as a user, bartender, or venue owner. We may also collect order-related data, basic usage information, and device information to ensure platform functionality and improve user experience. Guests may place orders without creating an account.

                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Use of Information
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>The information we collect is used to enable ordering, payments, tipping, order tracking, account management, communication between users, bartenders, and venues, platform improvement, security, and legal compliance.

                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ●

                            Data Storage and Security
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            We take reasonable technical and organizational measures to protect your information from unauthorized access, misuse, or loss. While we strive to protect your data, no digital platform can guarantee complete security.

                        </Caption1>

                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Sharing of Information
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            Payments and tips are processed through third-party payment providers. FLŌNX does not store card details. Tips are transferred directly to bartenders’ connected accounts. Refund handling, where applicable, follows venue policies and payment provider rules.
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
                            ● Third-Party Services
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                           FLŌNX uses third-party services for payments, analytics, and infrastructure. These services process data in accordance with their own privacy policies.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Data Retention
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            We retain personal information only for as long as necessary to provide services, comply with legal obligations, or resolve disputes.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Your Rights
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                           You may request access to, correction of, or deletion of your personal information by contacting us through the application.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Changes to This Policy
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                           We may update this Privacy Policy from time to time. Updates will be reflected in the application, and continued use indicates acceptance of the revised policy.
                        </Caption1>
                    </View>

                    <View>
                        <Body1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            ● Contact
                        </Body1>

                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                           If you have any questions or concerns about this Privacy Policy, please contact us through the in-app support section.
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