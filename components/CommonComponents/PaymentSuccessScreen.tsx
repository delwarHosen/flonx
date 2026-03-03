import { PaymentLinkLogoIcon } from '@/assets/images/icons/BarRelatedIcon/PaymentLinkLogoIcon'
import { TikmarkIcon } from '@/assets/images/icons/BarRelatedIcon/TikMarkIcon'
import { Colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CustomButton } from '../CustomButton'
import { Caption1, H4 } from '../typo/Typography'

export default function PaymentSuccessScreen() {
    const router= useRouter();
    return (
        <View style={styles.container}>

            {/* Top Logo */}
            <View style={styles.logoContainer}>
                <PaymentLinkLogoIcon />
            </View>

            {/* Center Content */}
            <View style={styles.centerContainer}>
                <View style={styles.successLogo}>
                    <TikmarkIcon />
                </View>

                <H4 color="#000000" style={styles.title}>
                    Success
                </H4>

                <Caption1 color="#000000" style={styles.subtitle}>
                    Your Payment Is {"\n"}Successfully Completed
                </Caption1>
            </View>

            {/* Bottom Button */}
            <View style={styles.buttonContainer}>
                <CustomButton
                    title="See my orders"
                    onPress={() => router.push("/guest/(tabs)/order")}
                    width="100%"
                    height={55}
                    borderRadius={10}
                    backgroundColor={Colors.COLOR_ACTIVE}
                    color="#000000"
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        paddingHorizontal: 20,
    },

    logoContainer: {
        alignItems: "center",
        marginTop: 40,
    },

    centerContainer: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 115
    },

    successLogo: {
        height: 64,
        width: 64,
        borderRadius: 32,
        // backgroundColor: Colors.COLOR_ACTIVE,
        justifyContent: "center",
        alignItems: "center",

    },

    title: {
        // marginTop: 24,
        textAlign: "center",
    },

    subtitle: {
        marginTop: 8,
        textAlign: "center",
        lineHeight: 20,
    },

    buttonContainer: {
        marginBottom: 30,
        marginTop: 115
    },
});
