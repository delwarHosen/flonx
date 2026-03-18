import SectionTitle from '@/components/SectionTitle';
import { Body3, Caption4, H2, H5 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

export enum OrderStatus {
    QUEUED = 1,
    IN_PROGRESS = 2,
}

interface OrderStatusContentProps {
    orderCode: string;
    nextRoute: string; // 
}

export const OrderStatusContent: React.FC<OrderStatusContentProps> = ({ orderCode, nextRoute }) => {
    const [step, setStep] = useState<OrderStatus>(OrderStatus.QUEUED);
    const router = useRouter();

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (step === OrderStatus.QUEUED) {
            timer = setTimeout(() => setStep(OrderStatus.IN_PROGRESS), 1500);
        } else if (step === OrderStatus.IN_PROGRESS) {
            timer = setTimeout(() => router.push(nextRoute as any), 1500);
        }

        return () => { if (timer) clearTimeout(timer); };
    }, [step]);

    const isQueued = step === OrderStatus.QUEUED;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SectionTitle title="My Orders" />
            </View>

            <View style={styles.content}>
                <View style={styles.codeCard}>
                    <H2 color="white" style={styles.codeText}>{orderCode}</H2>
                    <H5 color="white" italic>Order Code</H5>
                </View>

                <View style={[styles.statusBox, isQueued ? styles.borderOrange : styles.borderGreen]}>
                    <View style={[styles.iconCircle, { backgroundColor: isQueued ? '#F9731633' : '#22C55E33' }]}>
                        <Ionicons
                            name={isQueued ? 'list' : 'time-outline'}
                            size={24}
                            color={isQueued ? '#F97316' : '#22C55E'}
                        />
                    </View>
                    <View style={styles.statusTextContainer}>
                        <H5 color={isQueued ? '#F97316' : '#22C55E'}>
                            {isQueued ? 'Queued' : 'In Progress'}
                        </H5>
                        <Caption4 color="#999">
                            {isQueued ? 'Your order is in the queue' : 'Your drink is being prepared'}
                        </Caption4>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Body3 color="white" align="center">
                        We'll update you when your order is ready
                    </Body3>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '100%',
        paddingVertical: hp(16)
    },
    content: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? hp(10) : hp(20)
    },
    codeCard: {
        backgroundColor: Colors.COLOR_ACTIVE,
        width: '100%', aspectRatio: 16 / 7,
        borderRadius: 24, justifyContent: 'center', alignItems: 'center',
        marginBottom: 24, elevation: 8,
        shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, shadowRadius: 4.65,
    },
    codeText: {
        marginBottom: hp(8),
        fontSize: width * 0.12
    },
    statusBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 18,
        borderRadius: 20,
        borderWidth: 1.5,
        backgroundColor: 'rgba(255,255,255,0.05)'
    },
    statusTextContainer: {
        marginLeft: wp(16),
        flex: 1
    },
    borderOrange: {
        borderColor: '#F97316'
    },
    borderGreen: {
        borderColor: Colors.COLOR_ACTIVE
    },
    iconCircle: {
        padding: 12,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        marginTop: '2.5%',
        marginBottom: hp(20),
        // width: '80%'
    }
});