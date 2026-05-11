import SectionTitle from '@/components/SectionTitle';
import { Body3, Caption4, H2, H5 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

// ──  all status from Backend ──
export type BackendStatus =
  | 'PENDING'
  | 'QUEUED'
  | 'IN_PROGRESS'
  | 'READY_FOR_PIC'
  | 'PICKED'
  | 'CANCELLED';

interface StatusConfig {
  label: string;
  description: string;
  color: string;
  bgColor: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const STATUS_CONFIG: Record<BackendStatus, StatusConfig> = {
  PENDING: {
    label: 'Pending',
    description: 'Your order has been placed',
    color: '#F97316',
    bgColor: '#F9731633',
    icon: 'hourglass-outline',
  },
  QUEUED: {
    label: 'Queued',
    description: 'Your order is in the queue',
    color: '#F59E0B',
    bgColor: '#F59E0B33',
    icon: 'list',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    description: 'Your drink is being prepared',
    color: '#22C55E',
    bgColor: '#22C55E33',
    icon: 'time-outline',
  },
  READY_FOR_PIC: {
    label: 'Ready for Pickup',
    description: 'Your order is ready! Come pick it up',
    color: '#3B82F6',
    bgColor: '#3B82F633',
    icon: 'checkmark-circle-outline',
  },
  PICKED: {
    label: 'Picked Up',
    description: 'You have picked up your order',
    color: '#8B5CF6',
    bgColor: '#8B5CF633',
    icon: 'bag-check-outline',
  },
  CANCELLED: {
    label: 'Cancelled',
    description: 'Your order has been cancelled',
    color: '#EF4444',
    bgColor: '#EF444433',
    icon: 'close-circle-outline',
  },
};

interface OrderStatusContentProps {
  orderCode: string;
  status: BackendStatus;       // ← real backend status
  nextRoute?: string;
}

export const OrderStatusContent: React.FC<OrderStatusContentProps> = ({
  orderCode,
  status,
  nextRoute,
}) => {
  const router = useRouter();
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG['QUEUED'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SectionTitle title="My Orders" />
      </View>

<<<<<<< HEAD
      <View style={styles.content}>
        {/* Order Code Card */}
        <View style={styles.codeCard}>
          <H2 color="white" style={styles.codeText}>{orderCode}</H2>
          <H5 color="white" italic>Order Code</H5>
=======
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
>>>>>>> 598b77566d85205196026cfc4e287bae3dbcb0ef
        </View>

        {/* Status Box */}
        <View style={[styles.statusBox, { borderColor: config.color }]}>
          <View style={[styles.iconCircle, { backgroundColor: config.bgColor }]}>
            <Ionicons name={config.icon} size={24} color={config.color} />
          </View>
          <View style={styles.statusTextContainer}>
            <H5 color={config.color}>{config.label}</H5>
            <Caption4 color="#999">{config.description}</Caption4>
          </View>
        </View>

        {/* Footer message */}
        <View style={styles.footer}>
          <Body3 color="white" align="center">
            {status === 'CANCELLED'
              ? 'Your order was cancelled. Please contact support if needed.'
              : status === 'PICKED'
              ? 'Enjoy your drink! 🎉'
              : "We'll update you when your order is ready"}
          </Body3>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    width: '100%',
    paddingVertical: hp(16),
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? hp(10) : hp(20),
  },
  codeCard: {
    backgroundColor: Colors.COLOR_ACTIVE,
    width: '100%',
    aspectRatio: 16 / 7,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  codeText: {
    marginBottom: hp(8),
    fontSize: width * 0.12,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 18,
    borderRadius: 20,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  statusTextContainer: {
    marginLeft: wp(16),
    flex: 1,
  },
  iconCircle: {
    padding: 12,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: '2.5%',
    marginBottom: hp(20),
  },
});