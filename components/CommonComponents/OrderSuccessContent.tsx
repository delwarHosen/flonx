import { IMAGE_COMPONENTS } from '@/constants/image.index'
import { Colors } from '@/constants/theme'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'; // Platform add kora hoyeche
import { CustomButton } from '../CustomButton'
import SectionTitle from '../SectionTitle'
import { Caption1, H4 } from '../typo/Typography'

interface OrderSuccessProps {
    title?: string;
    tipRoute: string;
    orderAgainRoute: string;
}

export default function OrderSuccessContent({
    title = "Success",
    tipRoute,
    orderAgainRoute
}: OrderSuccessProps) {
    const router = useRouter();

    return (
        <View style={styles.centerContainer}>
            {/* iOS Status Bar spacing adjust */}
            <View style={{ marginTop: Platform.OS === 'ios' ? 10 : 40 }}>
                <SectionTitle title='My Order' />
            </View>
            <View style={styles.container}>
                {/* Center Content */}
                <View>
                    <View style={{ alignItems: "center" }}>
                        <Image
                            source={IMAGE_COMPONENTS.successImg}
                            style={styles.successLogo}
                            contentFit='cover'
                        />
                    </View>

                    <H4 color={Colors.NEUTRAL0} style={styles.title}>
                        {title}
                    </H4>

                    <Caption1 color={Colors.NEUTRAL0} style={styles.subtitle}>
                        Thank you for your order! {"\n"}Enjoy your drinks.
                    </Caption1>
                </View>

                {/* Bottom Button */}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Tip Bartender"
                        onPress={() => router.push(tipRoute as any)}
                        width="100%"
                        height={44}
                        borderRadius={100}
                        style={{ marginBottom: 10 }}
                    />
                    <CustomButton
                        title="Order Again"
                        onPress={() => router.push(orderAgainRoute as any)}
                        width="100%"
                        height={44}
                        borderRadius={100}
                        backgroundColor={Colors.NEUTRAL0}
                        color={Colors.BRAND_PRIMARY}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20, 
    },
    successLogo: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    title: {
        marginTop: 20,
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