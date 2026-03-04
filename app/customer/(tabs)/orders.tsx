import { Image } from 'expo-image';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types & Data (Apnar provided file theke) 
import { RightAngleIcon } from '@/assets/images/icons/ProfileInfoIcons/RightAngleIcon';
import { CustomButton } from '@/components/CustomButton';
import SectionTitle from '@/components/SectionTitle';
import { Body1, Body3, Caption1, H6 } from '@/components/typo/Typography';
import { OrderItem, orders } from '@/constants/data/orderData';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

const OrderScreen = () => {
  const [selectedTab, setSelectedTab] = useState<"Current Orders" | "Past Orders">("Current Orders");
  const router = useRouter();

  // Tab onujayi data filter
  const currentData = orders.find(cat => cat.categoryName === selectedTab)?.items || [];

  // renderOrderItem function er bhetore eita update korun
  const renderOrderItem = ({ item }: { item: OrderItem }) => {
    const isPastOrder = selectedTab === "Past Orders";

    return (
      <TouchableOpacity
        // Shudhu Past Order holei details page e jabe
        onPress={() => {
          if (isPastOrder) {
            router.push({
              pathname: "/customer/orders-details/my-orders",
              params: {
                
                id: item.id,
                name: item.name,
                price: item.price,
                date: item.date,
                time: item.time,
                quantity: item.quantity,
                subOrders: item.orders ? JSON.stringify(item.orders) : ""
              }
            });
          }
        }}
        style={styles.orderCard}
        activeOpacity={isPastOrder ? 0.8 : 1} // Current order hole click feedback off
      >
        <View style={styles.cardContent}>
          <Image source={item.img} style={styles.itemImage} contentFit="contain" />

          <View style={styles.itemInfo}>
            <Body1 style={{ fontWeight: 400 }} color={Colors.NEUTRAL0}>{item.name}</Body1>

            {!isPastOrder ? (
              <Body3 color={Colors.COLOR_ORANGE} italic style={styles.metaText}>
                {item.status}
              </Body3>
            ) : (
              <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.metaText}>
                {item.date} • {item.time}
              </Caption1>
            )}

            <H6 color={Colors.NEUTRAL0} style={{ marginTop: 4, fontWeight: 800 }}>${item.price}</H6>
          </View>

          {/* Shudhu Past Order holei arrow icon ta dekhabe */}
          {isPastOrder && <RightAngleIcon />}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ marginTop: 10 }}>
        <SectionTitle title='My Orders' />
      </View>

      {/* Custom Tab Switcher without main container background */}
      <View style={styles.tabWrapper}>
        {/* Current Orders Tab */}
        <View style={styles.tabItem}>
          <CustomButton
            title="Current Orders"
            onPress={() => setSelectedTab("Current Orders")}
            width="100%"
            height={44}
            borderRadius={100}
            backgroundColor={selectedTab === "Current Orders" ? undefined : '#1D1733'}
          />
        </View>

        {/* Past Orders Tab */}
        <View style={styles.tabItem}>
          <CustomButton
            title="Past Orders"
            onPress={() => setSelectedTab("Past Orders")}
            width="100%"
            height={44}
            borderRadius={100}
            backgroundColor={selectedTab === "Past Orders" ? undefined : '#1D1733'}
          />
        </View>
      </View>
      {/* Orders List */}
      <FlatList
        data={currentData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND
  },
  tabWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  tabItem: {
    width: '48%',
  },

  listContent: { paddingHorizontal: 20, paddingTop: 25 },
  orderCard: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 14,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemImage: {
    width: 68,
    height: 68,
    borderRadius: 12,
    backgroundColor: '#FEE2E2', // Placeholder bg for image highlight
  },
  itemInfo: { flex: 1, marginLeft: 15 },
  metaText: { marginVertical: 6, fontWeight: 400 },
});

export default OrderScreen;