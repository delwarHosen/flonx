import { OrderTabIcon } from '@/assets/images/icons/icon';
import { Colors } from '@/constants/theme';
import { useAddToCartMutation, useViewCartQuery } from '@/redux/services/orderApi';
import { fp, hp, wp } from '@/utils/responsive';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Platform,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomLoader from '../CustomLoader';
import SectionTitle from '../SectionTitle';
import { showToast } from '../Toast';
import BarCardComponents from '../cardComponents/BarCardComponents';
import ItemCard from '../cardComponents/ItemCard';
import { Body3, Body4, Caption1, Caption4 } from '../typo/Typography';

export interface VenueItem {
    _id: string;
    name: string;
    image?: any;
    price: number;
    tags?: string[];
    description?: string;
    isAvailable?: boolean;
}

export interface VenueCategory {
    _id: string;
    name: string;
}

export interface VenueInfo {
    _id: string;
    name: string;
    logo?: any;
    address?: string;
}

export interface ShopItemsScreenProps {
    barId: string;
    venue?: VenueInfo;
    categories?: VenueCategory[];
    items: VenueItem[];
    isLoading?: boolean;
    refetch?: () => void;
    isProdLoading?: boolean;
    selectedCategory: string | null;
    onCategorySelect: (id: string) => void;
    paths: {
        itemDetails: string;
        shopDetails: string;
        checkout: string;
    };
}

const ShopItemsScreen: React.FC<ShopItemsScreenProps> = ({
    barId,
    venue,
    categories,
    items,
    isLoading,
    refetch,
    isProdLoading,
    selectedCategory,
    onCategorySelect,
    paths,
}) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [addToCart] = useAddToCartMutation();

    // Redux বাদ — শুধু API থেকে cart data
    const { data: cartData } = useViewCartQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });




    const cartItems: { productId: string; quantity: number }[] = cartData?.items || [];

    // current venue এর items cart এ কতটা আছে
    const currentVenueItemIds = items.map((i) => i._id);

    const getCartQty = (productId: string) =>
        cartItems.find((c: any) => c.product?._id === productId)?.quantity || 0;

    const currentVenueTotalItems = currentVenueItemIds.reduce(
        (sum, id) => sum + getCartQty(id), 0
    );

    // অন্য venue এর item cart এ আছে কিনা
    const hasOtherVenueItems = cartItems.some(
        (c: any) => !currentVenueItemIds.includes(c.product?._id)
    );

    const totalPrice = items.reduce((sum, item) => {
        return sum + getCartQty(item._id) * (item.price || 0);
    }, 0);

    const handleAddToCart = async (item: VenueItem) => {
        if (hasOtherVenueItems) {
            showToast('Clear your cart before ordering from another venue.');
            return;
        }

        try {
            await addToCart({ productId: item._id, quantity: 1 }).unwrap();
        } catch (error: any) {
            showToast(error?.data?.message || 'Failed to add item.');
        }
    };

    const buildExistingCart = () =>
        items
            .filter((i) => getCartQty(i._id) > 0)
            .map((i) => ({
                _id: i._id,
                productId: i._id,
                name: i.name,
                image: i.image,
                price: i.price,
                quantity: getCartQty(i._id),
            }));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.APP_BACKGROUND }} edges={['top']}>
            <View style={styles.headerWrapper}>
                <SectionTitle title="Shop Items" />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <ItemCard
                            item={{
                                name: item.name,
                                img: item.image,
                                price: item.price,
                                ingredients: item.tags?.length
                                    ? item.tags
                                    : item.description ? [item.description] : [],
                            }}
                            isInCart={getCartQty(item._id) > 0}
                            onAdd={() => handleAddToCart(item)}
                            onPress={() =>
                                router.push({
                                    pathname: paths.itemDetails as any,
                                    params: {
                                        itemId: item._id,
                                        barId,
                                        itemName: item.name,
                                        itemImg: item.image,
                                        itemPrice: String(item.price),
                                        itemStatus: item.isAvailable ? 'in_stock' : 'out_of_stock',
                                        existingCart: JSON.stringify(buildExistingCart()),
                                    },
                                })
                            }
                        />
                    )}
                    ListHeaderComponent={
                        <View>
                            {venue && (
                                <BarCardComponents
                                    item={{
                                        name: venue.name,
                                        logo: venue.logo ?? '',
                                        status: 'open',
                                        location: venue.address ?? '',
                                    }}
                                    onPress={() =>
                                        router.push({
                                            pathname: paths.shopDetails as any,
                                            params: { barId: venue._id },
                                        })
                                    }
                                />
                            )}

                            {categories && categories.length > 0 && (
                                <View style={{ marginVertical: hp(15) }}>
                                    <FlatList
                                        horizontal
                                        data={categories}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(cat) => cat._id}
                                        renderItem={({ item: cat }) => {
                                            const isSelected = selectedCategory === cat._id;
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => onCategorySelect(cat._id)}
                                                    style={[styles.tab, isSelected && styles.activeTab]}
                                                >
                                                    <Body3 style={{ color: isSelected ? '#FFF' : Colors.OTP_COLOR }}>
                                                        {cat.name}
                                                    </Body3>
                                                </TouchableOpacity>
                                            );
                                        }}
                                    />
                                </View>
                            )}

                            {isProdLoading && !isLoading && <CustomLoader />}
                        </View>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={!!isLoading}
                            onRefresh={refetch}
                            tintColor={Colors.BRAND_PRIMARY}
                            colors={[Colors.BRAND_PRIMARY]}
                        />
                    }
                />

                {currentVenueTotalItems > 0 && (
                    <View style={[
                        styles.modalOverlay,
                        { bottom: Platform.OS === 'ios' ? insets.bottom + 10 : hp(55) }
                    ]}>
                        <View style={styles.modalContent}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                <View style={styles.cartBadge}>
                                    <OrderTabIcon />
                                </View>
                                <View>
                                    <Body4 color="#FFF">{currentVenueTotalItems} Items</Body4>
                                    <Caption1 color="#1D1733" style={styles.priceText}>
                                        ${totalPrice.toFixed(2)}
                                    </Caption1>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.checkoutBtn}
                                onPress={() =>
                                    router.push({
                                        pathname: paths.checkout as any,
                                        params: { barId },
                                    })
                                }
                            >
                                <Caption4 color="#1D1733">Checkout</Caption4>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default ShopItemsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
        paddingHorizontal: wp(20),
    },
    headerWrapper: { paddingVertical: hp(20) },
    tab: {
        paddingHorizontal: wp(20),
        paddingVertical: hp(7),
        borderRadius: 100,
        backgroundColor: Colors.INPUT_BACKGROUND,
        marginRight: wp(10),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        minWidth: wp(80),
    },
    activeTab: {
        backgroundColor: Colors.BRAND_PRIMARY,
        borderColor: Colors.BRAND_PRIMARY,
    },
    listContent: { paddingHorizontal: wp(20) },
    modalOverlay: {
        position: 'absolute',
        left: 20,
        right: 20,
        backgroundColor: Colors.BRAND_PRIMARY,
        borderRadius: 100,
        padding: 20,
        borderWidth: 1.5,
        borderColor: Colors.NEUTRAL0,
        elevation: 8,
    },
    modalContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartBadge: {
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: Colors.NEUTRAL0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutBtn: {
        backgroundColor: Colors.NEUTRAL0,
        paddingHorizontal: wp(20),
        paddingVertical: hp(12),
        borderRadius: 100,
    },
    priceText: { fontSize: fp(16), fontWeight: '800' },
});