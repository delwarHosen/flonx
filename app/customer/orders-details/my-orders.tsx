import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Theme & Typography
import { OrderONIcons } from '@/assets/images/icons/BarRelatedIcon/OrderOnIcon';
import { LocationIcon } from '@/assets/images/icons/icon';
import { CustomButton } from '@/components/CustomButton';
import SectionTitle from '@/components/SectionTitle';
import { Body2, Body3, Caption1, Caption2, H6 } from '@/components/typo/Typography';
import { orders } from '@/constants/data/orderData';
import { IMAGE_COMPONENTS } from '@/constants/image.index';
import { Colors } from '@/constants/theme';

const OrderDetailsScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [isTipped, setIsTipped] = useState(false); 

  // Params theke data receive
  const { id, name, price, date, time, quantity, subOrders } = params;

  // subOrders string-ke array-te convert kora
  const parsedSubOrders = subOrders ? JSON.parse(subOrders as string) : [];

  // "Past Orders" theke id onujayi backup data khoja
  const pastOrders = orders.find(cat => cat.categoryName === "Past Orders")?.items || [];
  const selectedOrder = pastOrders.find(item => item.id.toString() === id);

  if (!selectedOrder && parsedSubOrders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <SectionTitle title="Order Not Found" />
      </SafeAreaView>
    );
  }

  // Total Price calculate kora
  const totalPrice = parsedSubOrders.length > 0
    ? parsedSubOrders.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0)
    : (Number(price) * Number(quantity));

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingTop:20}}>
        <SectionTitle title="My Order" />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* 1. Bar Info Section */}
        <View style={styles.infoCard}>
          <View style={styles.iconBox}>
            <Image
              source={IMAGE_COMPONENTS.copperAlleyBar}
              style={{ height: 37, width: 37, borderRadius: 10 }}
              contentFit='cover'
            />
          </View>
          <View style={styles.infoText}>
            <H6 color={Colors.NEUTRAL0}>Copper Alley Bar</H6>
            <View style={styles.locationRow}>
              <LocationIcon />
              <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginLeft: 6 }}>
                Austin, Texas, USA
              </Caption1>
            </View>
          </View>
        </View>

        {/* 2. Ordered On Section */}
        <View style={styles.infoCard}>
          <View style={styles.iconBox}>
            <OrderONIcons />
          </View>
          <View style={styles.infoText}>
            <Body3 color={Colors.NEUTRAL0}>Ordered On</Body3>
            <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginTop: 8 }}>
              {date || selectedOrder?.date} • {time || selectedOrder?.time}
            </Caption1>
          </View>
        </View>

        {/* 3. Items Table */}
        <View style={styles.itemsCard}>
          <View style={styles.cardHeader}>
            <Body2 color={Colors.NEUTRAL0}>Items</Body2>
          </View>

          <View style={styles.itemList}>
            {parsedSubOrders.length > 0 ? (
              parsedSubOrders.map((item: any, index: number) => (
                <View key={item.id || index} style={[styles.itemRow, index !== parsedSubOrders.length - 1 && { marginBottom: 25 }]}>
                  <View>
                    <Caption2 color={Colors.PLACEHOLLDER_TEXT} italic style={{ marginBottom: 8 }}>
                      {item.name}
                    </Caption2>
                    <Body3 color={Colors.NEUTRAL0}>
                      Quantity: {item.quantity}
                    </Body3>
                  </View>
                  <H6 color={Colors.NEUTRAL0}>${item.price}</H6>
                </View>
              ))
            ) : (
              <View style={styles.itemRow}>
                <View>
                  <Body3 color={Colors.NEUTRAL0} italic style={{ marginBottom: 6 }}>
                    {name || selectedOrder?.name}
                  </Body3>
                  <Body3 color={Colors.NEUTRAL0}>
                    Quantity: {quantity || selectedOrder?.quantity}
                  </Body3>
                </View>
                <H6 color={Colors.NEUTRAL0}>${price || selectedOrder?.price}</H6>
              </View>
            )}

            <View style={styles.totalRow}>
              <H6 color={Colors.NEUTRAL0}>Total</H6>
              <H6 color={Colors.NEUTRAL0}>${totalPrice}</H6>
            </View>
          </View>
        </View>

        {/* 4. Footer Info - Show hoy jokhon isTipped true hoy */}
        {isTipped && (
          <View style={styles.footerCard}>
            <View style={styles.footerRow}>
              <View>
                <Body3 color={Colors.PLACEHOLLDER_TEXT} italic style={{ marginBottom: 4 }}>
                  You tipped the bartender
                </Body3>
                <H6 color={Colors.NEUTRAL0}>
                  Order Code: A7K{id || selectedOrder?.id}
                </H6>
              </View>
              <H6 color={Colors.NEUTRAL0}>$13</H6>
            </View>
          </View>
        )}

        <View >
          {/* Tip Bartender Button - isTipped false thaklei shudhu dekhabe */}
          {!isTipped && (
            <CustomButton
              title="Tip Bartender"
              onPress={() => setIsTipped(true)}
              width="100%"
              height={44}
              color={Colors.NEUTRAL0}
              borderRadius={100}
            />
          )}

          <CustomButton
            title="Back to orders"
            onPress={() => router.back()}
            width="100%"
            height={44}
            borderRadius={100}
            backgroundColor={Colors.NEUTRAL0}
            color={Colors.BRAND_PRIMARY}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
  },

  headerContainer: {
    marginTop: 10,
    marginBottom: 5,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },

  iconBox: {
    height: 37,
    width: 37,
    borderRadius: 10,
    backgroundColor: "#FFFFFF1A",
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoText: {
    marginLeft: 15,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  itemsCard: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 16,
    // marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    overflow: 'hidden',
  },

  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_COLOR,
  },

  itemList: {
    padding: 16,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER_COLOR,
    marginTop: 16,
  },

  footerCard: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    // marginBottom: 12,
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default OrderDetailsScreen;