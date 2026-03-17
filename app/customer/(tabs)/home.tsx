import { BartenderIcons } from '@/assets/images/icons/BarRelatedIcon/BartenderIcons';
import { QueuedIcon } from '@/assets/images/icons/BarRelatedIcon/QueuedIcon';
import { ScanIcon } from '@/assets/images/icons/BarRelatedIcon/ScanIcon';
import { NotificationIcon } from '@/assets/images/icons/ProfileInfoIcons/NotificationIcon';
import { CustomButton } from '@/components/CustomButton';
import EmptyStateCard from '@/components/EmptyStateCardProps';
import QRScannerModal from '@/components/QRScannerModal/QRScannerModal';
import { Body1, Body3, ButtonText, Caption1, H2, H5, H6 } from '@/components/typo/Typography';
import { IMAGE_COMPONENTS } from '@/constants/image.index';
import { Colors } from '@/constants/theme';
import { useCameraScanner } from '@/hooks/useCameraScanner';
import { hp, wp } from '@/utils/responsive';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  const [hasActiveOrder, setHasActiveOrder] = useState<boolean>(true);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const { checkPermission } = useCameraScanner();
  const router = useRouter();

  // Handle QR Scan Button Click
  const handleOpenScanner = async () => {
    const isAllowed = await checkPermission();
    if (isAllowed) {
      setIsScannerOpen(true);
    }
  };

  // Logic after successful scan
  const onScanSuccess = (qrData: string) => {
    setIsScannerOpen(false);
    // Success logic ekhane likhun (e.g., navigate to venue)
    Alert.alert("Success", `Venue QR Scanned: ${qrData}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Reusable QR Scanner Modal */}
      <QRScannerModal
        isVisible={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={onScanSuccess}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={IMAGE_COMPONENTS.profileImg}
              style={styles.avatar}
            />
            <View style={{ marginLeft: 12 }}>
              <Body1 italic color={Colors.NEUTRAL0} weight="bold">Hello Florian</Body1>
              <Body3 italic color={Colors.PLACEHOLLDER_TEXT}>Welcome to FLÖNX</Body3>
            </View>
          </View>
          <TouchableOpacity
          onPress={()=>router.push("/customer/notification")}
          style={styles.notificationBtn}>
            <NotificationIcon size={24} />
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <View style={styles.sectionTitle}>
          <Body1 color={Colors.NEUTRAL0} italic>Active Order</Body1>
        </View>

        {/* Conditional Rendering: Order Data thakle Card, na thakle Empty State */}
        {hasActiveOrder ? (
          /* --- Active Order Card (image_3840d6.png) --- */
          <View style={styles.orderCard}>
            <View style={styles.cardHeader}>
              <View style={styles.venueIconBg}>
                <BartenderIcons />
              </View>
              <H6 color={Colors.NEUTRAL0} style={{ marginLeft: wp(8) }}>Copper Alley Bar</H6>
            </View>

            <View style={styles.codeBanner}>
              <H5 italic align="center" color={"#FFFFFFCC"}>Order Code</H5>
              <H2 align="center" color={Colors.NEUTRAL0} style={{ marginTop: hp(12) }}>A44</H2>
            </View>

            <View style={styles.statusRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <QueuedIcon />
                <Body3 color="#F97316" italic style={{ marginLeft: wp(8) }}>Queued</Body3>
              </View>
              <Caption1 color={Colors.PLACEHOLLDER_TEXT}>2 items</Caption1>
            </View>

            <CustomButton
              title="View Order Details"
              onPress={() => router.push("/customer/(tabs)/orders")}
              // onPress={() => router.push("/customer/orders-details/my-orders")}
              width="100%"
              height={hp(44)}
              borderRadius={100}
            />
          </View>
        ) : (
          /* --- No Active Order Found (image_367de2.png) --- */
          <EmptyStateCard message="no active order found " />

        )}

        {/* Bottom Action Buttons (Always Visible) */}
        <View style={styles.bottomActions}>
          <CustomButton
            title=""
            onPress={handleOpenScanner}
            width="100%"
            height={hp(50)}
            borderRadius={100}
            icon={
              <View style={styles.buttonIconRow}>
                <ScanIcon />
                <ButtonText color={Colors.NEUTRAL0}>Scan Venue QR</ButtonText>
              </View>
            }
          />


          <CustomButton
            title=""
            onPress={() => router.push("/customer/(tabs)/search")}
            width="100%"
            height={hp(50)}
            borderRadius={100}
            backgroundColor={Colors.INPUT_BACKGROUND}
            icon={
              <View style={styles.buttonIconRow}>
                <BartenderIcons color={Colors.NEUTRAL0} size={20} />
                <ButtonText color={Colors.NEUTRAL0}>Explore Nearby Venues</ButtonText>
              </View>
            }
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
    // paddingHorizontal: 20,
    paddingHorizontal:wp(20),
    // paddingVertical: 20,
    paddingVertical:hp(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(10),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    backgroundColor: Colors.INPUT_BACKGROUND
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: hp(24),
    marginBottom: hp(16),
  },
  orderCard: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },
  /* Empty Card Styling */
  
  
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(16),
  },
  venueIconBg: {
    width: 22,
    height: 22,
    borderRadius: 3,
    padding: 3,
    backgroundColor: "#822CE733",
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeBanner: {
    backgroundColor: Colors.COLOR_ACTIVE,
    borderRadius: 24,
    paddingVertical: hp(30),
    marginBottom: hp(16),
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(16),
    paddingHorizontal: wp(4),
  },
  bottomActions: {
    marginTop: hp(16),
  },
  buttonIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default HomeScreen;