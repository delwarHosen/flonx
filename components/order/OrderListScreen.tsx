import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton } from '@/components/CustomButton';
import EmptyStateCard from '@/components/EmptyStateCardProps';
import SectionTitle from '@/components/SectionTitle';
import { Body1, Body3, Caption1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useGetOrderQuery } from '@/redux/services/orderApi';
import { RootState } from '@/redux/store';
import { hp, wp } from '@/utils/responsive';
import { useSelector } from 'react-redux';

import * as SecureStore from 'expo-secure-store';

const CURRENT_STATUSES = ['PENDING', 'QUEUED', 'IN_PROGRESS', 'READY_FOR_PIC'];
const PAST_STATUSES = ['PICKED', 'CANCELLED', 'DELIVERED', 'REJECTED'];

export interface OrderRoutes {
  currentOrder: string;
  pastOrderDetail: string;
  pickupOrder: string;
}

interface OrderListScreenProps {
  routes: OrderRoutes;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING': return '#F97316';
    case 'QUEUED': return '#F59E0B';
    case 'IN_PROGRESS': return '#22C55E';
    case 'READY_FOR_PIC': return '#3B82F6';
    case 'PICKED': return '#8B5CF6';
    case 'CANCELLED':
    case 'REJECTED': return '#EF4444';
    default: return '#F97316';
  }
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const formatTime = (d: string) =>
  new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

const formatStatus = (status: string) => status.replace(/_/g, ' ');

const OrderListScreen: React.FC<OrderListScreenProps> = ({ routes }) => {
  const role = useSelector((state: RootState) => state.auth.userRole);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const check = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      // console.log("OrderList — token decoded:", JSON.stringify(jwtDecode(token!), null, 2));
    };
    check();
  }, []);

  const [selectedTab, setSelectedTab] = useState<'Current Orders' | 'Past Orders'>('Current Orders');
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useGetOrderQuery(
    { page: 1, limit: 50 },
    { skip: false }
  );

  const allOrders = data?.result || [];

  const filteredOrders = allOrders.filter((order: any) =>
    selectedTab === 'Current Orders'
      ? CURRENT_STATUSES.includes(order.status)
      : PAST_STATUSES.includes(order.status)
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const renderOrderItem = ({ item }: { item: any }) => {
    const isPast = selectedTab === 'Past Orders';

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
            venueId: typeof item.venue === 'object' ? item.venue._id : item.venue,
            tipAmount: item.tipAmount || 0,
          },
        });
      } else if (item.status === 'READY_FOR_PIC') {
        router.push({
          pathname: routes.pickupOrder as any,
          params: {
            orderCode: item.orderCode,
            status: item.status,
            id: item._id,
            venueName: item.venue?.name || '',
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

        {/* ── Header: status/date top left ── */}
        <View style={styles.cardHeader}>
          {!isPast ? (
            <Body3 color={getStatusColor(item.status)} italic>
              {formatStatus(item.status)}
            </Body3>
          ) : (
            <Caption1 color={Colors.PLACEHOLLDER_TEXT}>
              {formatDate(item.createdAt)} • {formatTime(item.createdAt)}
            </Caption1>
          )}
        </View>

        {/* ── Items list ── */}
        {item.items?.map((orderItem: any, index: number) => {
          const product = orderItem.product;
          const productImage = product?.image || null;
          const productName = product?.name || 'Unknown Item';

          return (
            <View
              key={product?._id || index}
              style={[
                styles.itemRow,
                index !== item.items.length - 1 && styles.itemRowBorder,
              ]}
            >
              {productImage ? (
                <Image source={{ uri: productImage }} style={styles.itemImage} contentFit="cover" />
              ) : (
                <View style={[styles.itemImage, styles.imageFallback]} />
              )}
              <View style={styles.itemInfo}>
                <Body1 color={Colors.NEUTRAL0}>{productName}</Body1>
                <View>
                  <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginTop: 2 }}>
                    Quantity: {orderItem.quantity}
                  </Caption1>
                  <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginTop: 5 }}>
                    Price: ${orderItem.price}
                  </Caption1>
                </View>
              </View>
            </View>
          );
        })}

        {/* ── Footer: divider + price left, see more right ── */}
        <View style={styles.cardFooterWrapper}>
          <View style={styles.footerDivider} />
          <View style={styles.cardFooter}>
           
            <View style={styles.priceContainer}>
              <Body1 color={Colors.NEUTRAL0}>Total Price</Body1>
              <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginTop: 2 }}>
                ${item.totalPrice}
              </Caption1>
            </View>

           
            <CustomButton
              title="See More"
              onPress={handlePress} 
              width={wp(90)}     
              height={hp(38)}     
              borderRadius={100}
              backgroundColor={Colors.BRAND_PRIMARY}
            />
          </View>
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.BRAND_PRIMARY}
              colors={[Colors.BRAND_PRIMARY]}
            />
          }
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
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
  },
  tabWrapper: {
    flexDirection: 'row',
    paddingHorizontal: wp(20),
    justifyContent: 'space-between',
  },
  tabItem: {
    width: '48%',
  },
  listContent: {
    paddingHorizontal: wp(20),
    paddingTop: hp(25),
  },
  orderCard: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 14,
    padding: 12,
    marginBottom: hp(16),
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },
  cardHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // justifyContent:"flex-end",
    // alignItems: 'center',
    marginBottom: hp(10),
    paddingHorizontal: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(8),
  },
  itemRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_COLOR,
  },
  itemImage: {
    borderWidth: 1,
    borderColor: Colors.BRAND_PRIMARY,
    width: 56,
    height: 56,
    borderRadius: 10,
  },
  imageFallback: {
    backgroundColor: '#2D2459',
  },
  itemInfo: {
    flex: 1,
    marginLeft: wp(12),
  },
  
  footerDivider: {
    height: 1,
    backgroundColor: Colors.BORDER_COLOR,
    marginBottom: hp(10),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 4,
    marginTop: hp(4),
  },
  priceContainer: {
    flex: 1, 
  },
  
  cardFooterWrapper: {
    marginTop: hp(10),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderListScreen;