import { BartenderIcons } from '@/assets/images/icons/BarRelatedIcon/BartenderIcons';
import { QueuedIcon } from '@/assets/images/icons/BarRelatedIcon/QueuedIcon';
import { ScanIcon } from '@/assets/images/icons/BarRelatedIcon/ScanIcon';
import { CustomButton } from '@/components/CustomButton';
import CustomLoader from '@/components/CustomLoader';
import EmptyStateCard from '@/components/EmptyStateCardProps';
import NotificationBell from '@/components/Profile/NotificationBell';
import QRScannerModal from '@/components/QRScannerModal/QRScannerModal';
import { showToast } from '@/components/Toast';
import { Body1, Body3, ButtonText, Caption1, H2, H5, H6 } from '@/components/typo/Typography';
import { IMAGE_COMPONENTS } from '@/constants/image.index';
import { Colors } from '@/constants/theme';
import { useCameraScanner } from '@/hooks/useCameraScanner';
import { useGetProfileQuery } from '@/redux/services/authApi';
import { useGetOrderQuery } from '@/redux/services/orderApi';
import { hp, wp } from '@/utils/responsive';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, RefreshControl, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CURRENT_STATUSES = ['PENDING', 'QUEUED', 'IN_PROGRESS', 'READY_FOR_PIC'];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'PENDING': return '#F97316';
        case 'QUEUED': return '#F59E0B';
        case 'IN_PROGRESS': return '#22C55E';
        case 'READY_FOR_PIC': return '#3B82F6';
        default: return '#F97316';
    }
};

const formatStatus = (status: string) => status.replace(/_/g, ' ');

const HomeScreen: React.FC = () => {
    const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const { checkPermission } = useCameraScanner();
    const router = useRouter();

    const { data: profile, refetch: refetchProfile, isLoading: isProfileLoading } = useGetProfileQuery({});
    const { data: orderData, refetch: refetchOrders, isLoading: isOrderLoading, isFetching } = useGetOrderQuery({ page: 1, limit: 50 });

    const currentOrders = (orderData?.result || []).filter((order: any) =>
        CURRENT_STATUSES.includes(order.status)
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await Promise.all([refetchProfile(), refetchOrders()]);
        setRefreshing(false);
    };

    const handleOrderPress = (order: any) => {
        if (order.status === 'READY_FOR_PIC') {
            router.push({
                pathname: '/customer/items/pickup-order',
                params: {
                    orderCode: order.orderCode,
                    status: order.status,
                    id: order._id,
                    venueName: order.venue?.name || '',
                },
            });
        } else {
            router.push({
                pathname: '/customer/orders-details/current-order',
                params: {
                    orderCode: order.orderCode,
                    status: order.status,
                },
            });
        }
    };

    const handleOpenScanner = async () => {
        const isAllowed = await checkPermission();
        if (isAllowed) setIsScannerOpen(true);
    };



    const onScanSuccess = (qrData: string) => {
        setIsScannerOpen(false);

        try {
            const segments = qrData.split('/').filter(Boolean);
            const barId = segments[segments.length - 1];

            if (barId) {
                router.push({
                    pathname: '/customer/items/shop-items',
                    params: { barId: barId },
                });
            } else {

                showToast("Error, Invalid QR Code")
            }
        } catch {
            showToast("Error, Could not read QR Code")
        }
    };



    const renderOrderItem = ({ item: order }: { item: any }) => {
        const product = order.items?.[0]?.product;
        const extraCount = (order.items?.length || 1) - 1;
        const displayName = extraCount > 0
            ? `${product?.name} +${extraCount} more`
            : product?.name || 'Unknown Item';

        return (
            <TouchableOpacity
                style={styles.orderCard}
                onPress={() => handleOrderPress(order)}
                activeOpacity={0.8}
            >
                <View style={styles.cardHeader}>
                    <View style={styles.venueIconBg}>
                        <BartenderIcons />
                    </View>
                    <H6 color={Colors.NEUTRAL0} style={{ marginLeft: wp(8) }}>
                        {displayName}
                    </H6>
                </View>

                <View style={styles.codeBanner}>
                    <H5 italic align="center" color={"#FFFFFFCC"}>Order Code</H5>
                    <H2 align="center" color={Colors.NEUTRAL0} style={{ marginTop: hp(12) }}>
                        {order.orderCode}
                    </H2>
                </View>

                <View style={styles.statusRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <QueuedIcon color={getStatusColor(order.status)} />
                        <Body3
                            color={getStatusColor(order.status)}
                            italic
                            style={{ marginLeft: wp(8) }}
                        >
                            {formatStatus(order.status)}
                        </Body3>
                    </View>
                    <Caption1 color={Colors.PLACEHOLLDER_TEXT}>
                        {order.totalQuantity} items
                    </Caption1>
                </View>

                <CustomButton
                    title="View Order Details"
                    onPress={() => handleOrderPress(order)}
                    width="100%"
                    height={hp(44)}
                    borderRadius={100}
                />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" />

            <QRScannerModal
                isVisible={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={onScanSuccess}
            />


            {(isProfileLoading || isOrderLoading) && !currentOrders.length && !refreshing ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <CustomLoader size={40} />
                </View>
            ) : (
                <FlatList
                    data={currentOrders}
                    keyExtractor={(item) => item._id}
                    renderItem={renderOrderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    stickyHeaderIndices={[0]}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[Colors.BRAND_PRIMARY]}
                            progressViewOffset={hp(80)}
                        />
                    }
                    ListHeaderComponent={
                        <View style={styles.stickyHeaderContainer}>
                            <View style={styles.header}>
                                <View style={styles.userInfo}>
                                    <TouchableOpacity onPress={() => router.push("/customer/profile")}>
                                        <Image
                                            source={profile?.profile_image ? { uri: profile.profile_image } : IMAGE_COMPONENTS.profileImg}
                                            style={styles.avatar}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ marginLeft: 12 }}>
                                        <Body1 italic color={Colors.NEUTRAL0} weight="bold">Hello {profile?.name || 'User'}</Body1>
                                        <Body3 italic color={Colors.PLACEHOLLDER_TEXT}>Welcome to FLÖNX</Body3>
                                    </View>
                                </View>

                                <NotificationBell notificationPath="/customer/notification" />
                            </View>

                            <View style={styles.sectionTitle}>
                                <Body1 color={Colors.NEUTRAL0} italic>Active Orders</Body1>
                            </View>
                        </View>
                    }
                    ListEmptyComponent={
                        <View style={{paddingHorizontal:wp(20)}}>
                            <EmptyStateCard message="No active orders found" />
                        </View>
                    }
                    ListFooterComponent={
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
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    stickyHeaderContainer: {
        backgroundColor: Colors.APP_BACKGROUND,
        paddingHorizontal: wp(10),
        paddingTop: hp(10),
        paddingBottom: hp(10),
        zIndex: 100,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(10),
    },
    scrollContent: {
        paddingBottom: hp(30),
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
        backgroundColor: Colors.INPUT_BACKGROUND,
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
        marginTop: hp(5),
        marginBottom: hp(5),
        marginHorizontal: wp(16)
    },
    orderCard: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        marginBottom: hp(12),
        marginHorizontal: wp(20),
    },
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
        borderRadius: 16,
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
        gap: hp(16),
        marginBottom: hp(20),
        paddingHorizontal: wp(20),
    },
    buttonIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});

export default HomeScreen;