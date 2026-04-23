import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OrderONIcons } from '@/assets/images/icons/BarRelatedIcon/OrderOnIcon';
import { LocationIcon } from '@/assets/images/icons/icon';
import { CustomButton } from '@/components/CustomButton';
import SectionTitle from '@/components/SectionTitle';
import { Body2, Body3, Caption1, Caption2, H6 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useGetVenueByIdQuery } from '@/redux/services/venueApi';
import { hp } from '@/utils/responsive';

interface OrderDetailsScreenProps {
  tipRoute: string;
}

const OrderDetailsScreen = ({ tipRoute }: OrderDetailsScreenProps) => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const { id, orderCode, totalPrice, date, time, totalQuantity, items, venueId, tipAmount } = params;

  const parsedItems: any[] = items ? JSON.parse(items as string) : [];
  const parsedTipAmount = tipAmount ? Number(tipAmount) : null;
  const isTipped = parsedTipAmount && parsedTipAmount > 0;

  const { data: venue } = useGetVenueByIdQuery(venueId, { skip: !venueId });

//   console.log("tipRoute:", tipRoute)
//   console.log("orderId:", id)

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: hp(16) }}>
        <SectionTitle title="My Order" />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* 1. Venue Info */}
        <View style={styles.infoCard}>
          <View style={styles.iconBox}>
            {venue?.logo ? (
              <Image
                source={{ uri: venue.logo }}
                style={{ height: 37, width: 37, borderRadius: 10 }}
                contentFit='cover'
              />
            ) : (
              <View style={{ height: 37, width: 37, borderRadius: 10, backgroundColor: '#2D2459' }} />
            )}
          </View>
          <View style={styles.infoText}>
            <H6 color={Colors.NEUTRAL0}>{venue?.name || 'Loading...'}</H6>
            <View style={styles.locationRow}>
              <LocationIcon />
              <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginLeft: 6 }}>
                {venue?.address || ''}
              </Caption1>
            </View>
          </View>
        </View>

        {/* 2. Ordered On */}
        <View style={styles.infoCard}>
          <View style={styles.iconBox}>
            <OrderONIcons />
          </View>
          <View style={styles.infoText}>
            <Body3 color={Colors.NEUTRAL0}>Ordered On</Body3>
            <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginTop: 8 }}>
              {date} • {time}
            </Caption1>
          </View>
        </View>

        {/* 3. Items Table */}
        <View style={styles.itemsCard}>
          <View style={styles.cardHeader}>
            <Body2 color={Colors.NEUTRAL0}>Items</Body2>
          </View>
          <View style={styles.itemList}>
            {parsedItems.map((orderItem: any, index: number) => (
              <View
                key={orderItem.product?._id || index}
                style={[
                  styles.itemRow,
                  index !== parsedItems.length - 1 && { marginBottom: 25 }
                ]}
              >
                <View>
                  <Caption2 color={Colors.PLACEHOLLDER_TEXT} italic style={{ marginBottom: 8 }}>
                    {orderItem.product?.name || 'Unknown Item'}
                  </Caption2>
                  <Body3 color={Colors.NEUTRAL0}>
                    Quantity: {orderItem.quantity}
                  </Body3>
                </View>
                <H6 color={Colors.NEUTRAL0}>${orderItem.price * orderItem.quantity}</H6>
              </View>
            ))}

            <View style={styles.totalRow}>
              <H6 color={Colors.NEUTRAL0}>Total</H6>
              <H6 color={Colors.NEUTRAL0}>${totalPrice}</H6>
            </View>
          </View>
        </View>

        {/* 4. Tip Section */}
        {isTipped ? (
          <View style={[styles.footerCard, { marginTop: 12 }]}>
            <View style={styles.footerRow}>
              <View>
                <Body3 color={Colors.PLACEHOLLDER_TEXT} italic style={{ marginBottom: 4 }}>
                  You tipped the bartender
                </Body3>
                <H6 color={Colors.NEUTRAL0}>Order Code: {orderCode}</H6>
              </View>
              <H6 color={Colors.NEUTRAL0}>${parsedTipAmount}</H6>
            </View>
          </View>
        ) : (
          <CustomButton
            title="Tip Bartender"
            onPress={() => router.push({
              pathname: tipRoute as any,
              params: { orderId: id }
            })}
            width="100%"
            height={44}
            color={Colors.NEUTRAL0}
            borderRadius={100}
            style={{ marginTop: hp(24) }}
          />
        )}

        {/* 5. Back Button */}
        <View style={{ marginTop: 0 }}>
          <CustomButton
            title="Back to orders"
            onPress={() => router.back()}
            width="100%"
            height={44}
            borderRadius={100}
            backgroundColor={Colors.NEUTRAL0}
            color={Colors.BRAND_PRIMARY}
            style={{ marginTop: hp(16) }}
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
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default OrderDetailsScreen;