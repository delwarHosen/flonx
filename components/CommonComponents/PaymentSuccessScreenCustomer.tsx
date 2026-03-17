import { PaymentLinkLogoIcon } from '@/assets/images/icons/BarRelatedIcon/PaymentLinkLogoIcon'
import { TikmarkIcon } from '@/assets/images/icons/BarRelatedIcon/TikMarkIcon'
import { Colors } from '@/constants/theme'
import { hp, wp } from '@/utils/responsive'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'; // iOS Safe Area Handle korar jonno
import { CustomButton } from '../CustomButton'
import { Caption1, H4 } from '../typo/Typography'

export default function PaymentSuccessScreen() {
    const router = useRouter();
    return (
        // SafeAreaView bebohar kora hoyeche jate Notch area-te content na jay
        <SafeAreaView style={styles.container}>

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
                    onPress={() => router.push("/customer/(tabs)/orders")}
                    width="100%"
                    height={hp(55)}
                    borderRadius={10}
                    backgroundColor={Colors.COLOR_ACTIVE}
                    color="#000000"
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        paddingHorizontal: wp(20),
        justifyContent: "space-evenly",
        // Negative marginTop-ti iOS notch-er bhetore content dhukiye dewar karone ektu adjust kora lagte pare
        marginTop: hp(-120)
    },

    logoContainer: {
        alignItems: "center",
    },

    centerContainer: {
        justifyContent: "center",
        alignItems: "center",
    },

    successLogo: {
        height: 64,
        width: 64,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        textAlign: "center",
    },

    subtitle: {
        marginTop: hp(8),
        textAlign: "center",
        lineHeight: 20,
    },

    buttonContainer: {
        // iOS physical home bar theke safe distance maintain korbe
        paddingBottom: hp(10), 
    },
});