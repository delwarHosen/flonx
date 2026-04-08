import { BackendStatus, OrderStatusContent } from '@/components/ItemsRelated/OrderStatusContent';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CurrentOrderScreenProps {
  pickupRoute: string;   // '/guest/pickup-order' | '/customer/items/pickup-order'
  fallbackRoute: string; // '/guest/(tabs)/order' | '/customer/(tabs)/orders'
}

// ── Reusable wrapper ──
export function CurrentOrderScreen({ pickupRoute, fallbackRoute }: CurrentOrderScreenProps) {
  const { orderCode, status } = useLocalSearchParams<{
    orderCode: string;
    status: BackendStatus;
  }>();

  const nextRoute =
    status === 'READY_FOR_PIC' || status === 'PICKED' ? pickupRoute : fallbackRoute;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0B1A' }}>
      <OrderStatusContent
        orderCode={orderCode ?? ''}
        status={(status as BackendStatus) ?? 'QUEUED'}
        nextRoute={nextRoute}
      />
    </SafeAreaView>
  );
}