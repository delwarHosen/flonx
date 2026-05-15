import { BackendStatus, OrderStatusContent } from '@/components/ItemsRelated/OrderStatusContent';
import { useGetOrderQuery } from '@/redux/services/orderApi';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CurrentOrderScreenProps {
  pickupRoute: string;
  fallbackRoute: string;
}

export function CurrentOrderScreen({ pickupRoute, fallbackRoute }: CurrentOrderScreenProps) {
  const { orderCode, status: initialStatus, colorCode } = useLocalSearchParams<{
    orderCode: string;
    status: BackendStatus;
    colorCode: string;
  }>();

  const { data } = useGetOrderQuery(
    { page: 1, limit: 20 },
    {
      pollingInterval: 4000,
      skip: !orderCode,
    }
  );




  const matchedOrder = data?.result?.find(
    (order: any) => order.orderCode === orderCode
  );

  const liveStatus = (matchedOrder?.status ?? initialStatus ?? 'QUEUED') as BackendStatus;

  console.log('orderCode from params:', orderCode);
  console.log('liveStatus:', liveStatus);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0B1A' }}>
      <OrderStatusContent
        orderCode={orderCode ?? ''}
        status={liveStatus}
        nextRoute={pickupRoute}
        colorCode={colorCode}
      />
    </SafeAreaView>
  );
}