import { IMAGE_COMPONENTS } from '@/constants/image.index'
import { Colors } from '@/constants/theme'
import { hp, wp } from '@/utils/responsive'
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
    orderId?: string;
}

export default function OrderSuccessContent({
    title = "Success",
    tipRoute,
    orderAgainRoute,
    orderId
}: OrderSuccessProps) {
    const router = useRouter();

    // tip button press
    const handleTip = () => {
        router.push({
            pathname: tipRoute as any,
            params: orderId ? { orderId } : {}   // ← ADD
        });
    };

    return (
        <View style={styles.centerContainer}>
            {/* iOS Status Bar spacing adjust */}
            <View style={{ marginTop: Platform.OS === 'ios' ? "3%" : "10%" }}>
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
                       onPress={handleTip}
                        width="100%"
                        height={hp(44)}
                        borderRadius={100}
                        style={{ marginBottom: hp(10) }}
                    />
                    <CustomButton
                        title="Order Again"
                        onPress={() => router.push(orderAgainRoute as any)}
                        width="100%"
                        height={hp(44)}
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
        paddingHorizontal: wp(20),
        marginTop: 20,
        paddingBottom: Platform.OS === 'ios' ? hp(30) : hp(20),
    },
    successLogo: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    title: {
        marginTop: hp(20),
        textAlign: "center",
    },
    subtitle: {
        marginTop: hp(8),
        textAlign: "center",
        lineHeight: 20,
    },
    buttonContainer: {
        marginBottom: hp(30),
        marginTop: hp(16)
    },
});