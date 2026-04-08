import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RightAngleIcon } from '@/assets/images/icons/ProfileInfoIcons/RightAngleIcon';
import { CustomButton } from '@/components/CustomButton';
import EmptyStateCard from '@/components/EmptyStateCardProps';
import SectionTitle from '@/components/SectionTitle';
import { Body1, Body3, Caption1, H6 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useGetOrderQuery } from '@/redux/services/orderApi';
import { hp, wp } from '@/utils/responsive';

// ── Status groups ──────────────────────────────
const CURRENT_STATUSES = ['PENDING', 'QUEUED', 'IN_PROGRESS', 'READY_FOR_PIC'];
const PAST_STATUSES    = ['PICKED', 'CANCELLED', 'DELIVERED', 'REJECTED'];

// ── Route config — caller  pass  ──
export interface OrderRoutes {
  currentOrder: string;   // e.g. '/guest/current-order' | '/customer/orders-details/current-order'
  pastOrderDetail: string; // e.g. '/guest/orders-details/my-orders' | '/customer/orders-details/my-orders'
}

interface OrderListScreenProps {
  routes: OrderRoutes;
}

// ── Status color ───────────────────────────────
const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':       return '#F97316';
    case 'QUEUED':        return '#F59E0B';
    case 'IN_PROGRESS':   return '#22C55E';
    case 'READY_FOR_PIC': return '#3B82F6';
    case 'PICKED':        return '#8B5CF6';
    case 'CANCELLED':
    case 'REJECTED':      return '#EF4444';
    default:              return '#F97316';
  }
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const formatTime = (d: string) =>
  new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

// ── Main reusable component ────────────────────
const OrderListScreen: React.FC<OrderListScreenProps> = ({ routes }) => {
  const [selectedTab, setSelectedTab] = useState<'Current Orders' | 'Past Orders'>('Current Orders');
  const router = useRouter();

  const { data, isLoading, isError } = useGetOrderQuery({ page: 1, limit: 50 });
  const allOrders = data?.result || [];

  const filteredOrders = allOrders.filter((order: any) =>
    selectedTab === 'Current Orders'
      ? CURRENT_STATUSES.includes(order.status)
      : PAST_STATUSES.includes(order.status)
  );

  const renderOrderItem = ({ item }: { item: any }) => {
    const isPast       = selectedTab === 'Past Orders';
    const product      = item.items?.[0]?.product;
    const productImage = product?.image || null;
    const productName  = product?.name  || 'Unknown Item';
    const extraCount   = (item.items?.length || 1) - 1;
    const displayName  = extraCount > 0 ? `${productName} +${extraCount} more` : productName;

    const handlePress = () => {
      if (isPast) {
        router.push({
          pathname: routes.pastOrderDetail as any,
          params: {
            id: item._id,
            orderCode: item.orderCode,
            totalPrice: item.totalPrice,
            date: formatDate(item.createdAt),
            time: formatTime(item.createdAt),
            totalQuantity: item.totalQuantity,
            items: JSON.stringify(item.items),
          },
        });
      } else {
        router.push({
          pathname: routes.currentOrder as any,
          params: {
            orderCode: item.orderCode,
            status: item.status,
          },
        });
      }
    };

    return (
      <TouchableOpacity onPress={handlePress} style={styles.orderCard} activeOpacity={0.8}>
        <View style={styles.cardContent}>
          {productImage ? (
            <Image source={{ uri: productImage }} style={styles.itemImage} contentFit="cover" />
          ) : (
            <View style={[styles.itemImage, styles.imageFallback]} />
          )}

          <View style={styles.itemInfo}>
            <Body1 color={Colors.NEUTRAL0}>{displayName}</Body1>

            {!isPast ? (
              <Body3 color={getStatusColor(item.status)} italic style={styles.metaText}>
                {item.status}
              </Body3>
            ) : (
              <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.metaText}>
                {formatDate(item.createdAt)} • {formatTime(item.createdAt)}
              </Caption1>
            )}

            <H6 color={Colors.NEUTRAL0} style={{ marginTop: 4 }}>${item.totalPrice}</H6>
          </View>

          <RightAngleIcon />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionTitle title="My Orders" />

      <View style={styles.tabWrapper}>
        {(['Current Orders', 'Past Orders'] as const).map((tab) => (
          <View key={tab} style={styles.tabItem}>
            <CustomButton
              title={tab}
              onPress={() => setSelectedTab(tab)}
              width="100%"
              height={hp(44)}
              borderRadius={100}
              backgroundColor={selectedTab === tab ? undefined : '#1D1733'}
            />
          </View>
        ))}
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#8B5CF6" />
        </View>
      ) : isError ? (
        <View style={styles.centerContainer}>
          <EmptyStateCard message="Failed to load orders. Please try again." />
        </View>
      ) : filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{ padding: 20 }}>
          <EmptyStateCard
            message={selectedTab === 'Current Orders' ? 'No current orders' : 'No past orders'}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
  tabWrapper:    { flexDirection: 'row', paddingHorizontal: wp(20), justifyContent: 'space-between' },
  tabItem:       { width: '48%' },
  listContent:   { paddingHorizontal: wp(20), paddingTop: hp(25) },
  orderCard: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 14, padding: 10, marginBottom: hp(16),
    borderWidth: 1, borderColor: Colors.BORDER_COLOR,
  },
  cardContent:   { flexDirection: 'row', alignItems: 'center' },
  itemImage:     { width: 68, height: 68, borderRadius: 12, backgroundColor: '#FEE2E2' },
  imageFallback: { backgroundColor: '#2D2459' },
  itemInfo:      { flex: 1, marginLeft: wp(15) },
  metaText:      { marginVertical: hp(6) },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default OrderListScreen;