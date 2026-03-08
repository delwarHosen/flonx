import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SectionTitle from '@/components/SectionTitle';
import { Body3, H2, H4 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';

enum OrderStatus {
    QUEUED = 1,
    IN_PROGRESS = 2,
}

const CurrentOrder: React.FC = () => {
    const [step, setStep] = useState<OrderStatus>(OrderStatus.QUEUED);
    const router = useRouter();

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (step === OrderStatus.QUEUED) {
            timer = setTimeout(() => setStep(OrderStatus.IN_PROGRESS), 5000);
        } else if (step === OrderStatus.IN_PROGRESS) {
            timer = setTimeout(() => router.push('/customer/items/pickup-order'), 5000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [step]);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <SectionTitle title="My Orders" />
            </View>

            <View style={styles.content}>
                {/* Order Code Card */}
                <View style={styles.codeCard}>
                    <H2 color="white" style={{ marginBottom: 12 }}>A44</H2>
                    <H4 color="white" italic>Order Code</H4>
                </View>

                {/* Status Box */}
                <View
                    style={[
                        styles.statusBox,
                        step === OrderStatus.QUEUED ? styles.borderOrange : styles.borderGreen,
                    ]}
                >
                    <View
                        style={[
                            styles.iconCircle,
                            {
                                backgroundColor:
                                    step === OrderStatus.QUEUED ? '#F9731680' : '#22C55E80',
                            },
                        ]}
                    >
                        <Ionicons
                            name={step === OrderStatus.QUEUED ? 'list' : 'time-outline'}
                            size={20}
                            color={step === OrderStatus.QUEUED ? '#F97316' : '#22C55E'}
                        />
                    </View>
                    <View style={{ marginLeft: 12 }}>
                        <H4 color={step === OrderStatus.QUEUED ? '#F97316' : '#22C55E'}>
                            {step === OrderStatus.QUEUED ? 'Queued' : 'In Progress'}
                        </H4>
                        <Body3 color="#999">
                            {step === OrderStatus.QUEUED
                                ? 'Your order is in the queue'
                                : 'Your drink is being prepared'}
                        </Body3>
                    </View>
                </View>

                <Body3 color="white" align="center" style={{ marginTop: 20 }}>
                    We'll update you when your order is ready
                </Body3>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0B1A',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop:20
    },
    codeCard: {
        backgroundColor: Colors.COLOR_ACTIVE,
        width: '100%',
        height: 150,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    statusBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    borderOrange: { borderColor: '#F97316' },
    borderGreen: { borderColor: Colors.COLOR_ACTIVE },
    iconCircle: {
        padding: 10,
        borderRadius: 10,
    },
});

export default CurrentOrder;