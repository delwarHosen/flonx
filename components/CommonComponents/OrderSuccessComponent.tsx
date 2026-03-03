import { IMAGE_COMPONENTS } from '@/constants/image.index'
import { Colors } from '@/constants/theme'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CustomButton } from '../CustomButton'
import SectionTitle from '../SectionTitle'
import { Caption1, H4 } from '../typo/Typography'

export default function OrderSuccessComponent() {
    const router = useRouter();
    return (
        <View style={styles.centerContainer}>
            {/* Top Logo */}
            <View >
                <SectionTitle title='My Order' />
            </View>
            <View style={styles.container}>

                {/* Center Content */}
                <View>
                    <View style={{ alignItems: "center" }}>
                        <Image
                            source={IMAGE_COMPONENTS.successImg}
                            style={styles.successLogo} contentFit='cover' />
                    </View>

                    <H4 color={Colors.NEUTRAL0} style={styles.title}>
                        Success
                    </H4>

                    <Caption1 color={Colors.NEUTRAL0} style={styles.subtitle}>
                        Thank you for your order! {"\n"}Enjoy your drinks.
                    </Caption1>
                </View>

                {/* Bottom Button */}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Tip Bartender"
                        onPress={() => router.push("/guest/(tabs)/order")}
                        width="100%"
                        height={55}
                        borderRadius={100}
                        style={{ marginBottom: 10 }}
                    />
                    <CustomButton
                        title="Order Again"
                        onPress={() => router.push("/guest/(tabs)/order")}
                        width="100%"
                        height={55}
                        borderRadius={100}
                        backgroundColor={Colors.NEUTRAL0}
                        color={Colors.BRAND_PRIMARY}
                    />
                </View>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
        // paddingHorizontal: 20,
    },

    container: {
        paddingHorizontal: 20,
        marginTop: 20
    },

    successLogo: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },

    title: {
        marginTop: 24,
        textAlign: "center",
    },

    subtitle: {
        marginTop: 8,
        textAlign: "center",
        lineHeight: 20,
    },

    buttonContainer: {
        marginBottom: 30,
        marginTop: 16
    },
});
