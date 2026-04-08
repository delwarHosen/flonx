import { OrderTabIcon } from '@/assets/images/icons/icon';
import { Colors } from '@/constants/theme';
import { addItem, removeItem } from '@/redux/cartSlice';
import { useAddToCartMutation } from '@/redux/services/orderApi';
import { RootState } from '@/redux/store';
import { fp, hp, wp } from '@/utils/responsive';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Platform,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import EmptyStateCard from '../EmptyStateCardProps';
import SectionTitle from '../SectionTitle';
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

interface ShopItemsScreenProps {
    barId: string;
    venue?: VenueInfo;
    categories?: VenueCategory[];
    items: VenueItem[];
    isLoading?: boolean;
    refetch?: () => void,
    isCatLoading?: boolean;
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
    const dispatch = useDispatch();

    // only Redux cart, no local cart state
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [showModal, setShowModal] = useState(false);
    const [addToCart] = useAddToCartMutation();

    // const handleAddToCart = async (item: VenueItem) => {
    //     dispatch(addItem({ id: item._id, barId }));
    //     setShowModal(true);
    //     try {
    //         await addToCart({ productId: item._id, quantity: 1 }).unwrap();
    //     } catch (error) {
    //         dispatch(removeItem({ id: item._id }));
    //         console.error('Add to cart failed:', error);
    //     }
    // };

    const handleAddToCart = async (item: VenueItem) => {
        dispatch(addItem({ id: item._id, barId }));
        setShowModal(true);
        try {
            await addToCart({ productId: item._id, quantity: 1 }).unwrap();
        } catch (error) {
            dispatch(removeItem({ id: item._id }));
        }
    };

    //  helper to build existingCart from cartItems
    const buildExistingCart = () =>
        items
            .filter((i) => cartItems[i._id] > 0)
            .map((i) => ({
                _id: i._id,
                productId: i._id,
                name: i.name,
                image: i.image,
                price: i.price,
                tags: i.tags ?? [],
                description: i.description ?? '',
                isAvailable: i.isAvailable ?? true,
                quantity: cartItems[i._id],
            }));


    const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    const totalPrice = items.reduce((sum, item) => {
        return sum + (cartItems[item._id] || 0) * (item.price || 0);
    }, 0);



    if (isLoading) return null;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.headerWrapper}>
                <SectionTitle title="Shop Item" />
            </View>

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
                                : item.description
                                    ? [item.description]
                                    : [],
                        }}
                        //  cartItems 
                        // isInCart={!!cartItems[item._id]}
                        isInCart={!!cartItems[item._id]}
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
                                    itemIngredients: item.tags?.length
                                        ? item.tags.join(', ')
                                        : item.description || '',
                                    itemStatus: item.isAvailable ? 'in_stock' : 'out_of_stock',
                                    /// built from cartItems
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
                                    contentContainerStyle={{ paddingRight: wp(20) }}
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

                        {isProdLoading && (
                            <ActivityIndicator
                                color={Colors.BRAND_PRIMARY}
                                style={{ marginVertical: hp(10) }}
                            />
                        )}
                    </View>
                }
                ListEmptyComponent={
                    !isProdLoading ? (
                        <View style={{ marginTop: 20 }}>
                            <EmptyStateCard message="No Items Found" />
                        </View>
                    ) : null
                }
                contentContainerStyle={[
                    styles.listContent,
                    { paddingBottom: showModal ? 120 : 40 },
                ]}
                refreshControl={<RefreshControl refreshing={isLoading as boolean} onRefresh={refetch as any} />}
            />

            {showModal && totalItems > 0 && (
                <View style={[
                    styles.modalOverlay,
                    { bottom: Platform.OS === 'ios' ? insets.bottom + 10 : hp(55) },
                ]}>
                    {
                        totalItems > 0 && (
                            <View style={styles.modalContent}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                    <View style={styles.cartBadge}>
                                        <OrderTabIcon />
                                    </View>
                                    <View>
                                        <Body4 color="#FFF" style={{ marginBottom: 2 }}>
                                            {totalItems} Items
                                        </Body4>
                                        <Caption1 color="#1D1733" style={styles.priceText}>
                                            ${totalPrice}
                                        </Caption1>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={styles.checkoutBtn}
                                    onPress={() => {

                                        const cartData = items
                                            .filter((item) => cartItems[item._id] > 0)
                                            .map((item) => ({
                                                _id: item._id,
                                                productId: item._id,
                                                name: item.name,
                                                image: item.image,
                                                price: item.price,
                                                tags: item.tags ?? [],
                                                description: item.description ?? '',
                                                isAvailable: item.isAvailable ?? true,
                                                quantity: cartItems[item._id],
                                            }));
                                        router.push({
                                            pathname: paths.checkout as any,
                                            params: {
                                                cartData: JSON.stringify(cartData),
                                                barId,
                                            },
                                        });
                                    }}
                                >
                                    <Caption4 color="#1D1733">Checkout</Caption4>
                                </TouchableOpacity>
                            </View>
                        )
                    }

                </View>
            )}
        </SafeAreaView>
    );
};

export default ShopItemsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
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
    modalContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cartBadge: {
        width: 40, height: 40, borderRadius: 10,
        borderWidth: 0.8, borderColor: Colors.NEUTRAL0,
        justifyContent: 'center', alignItems: 'center',
    },
    checkoutBtn: {
        backgroundColor: Colors.NEUTRAL0,
        paddingHorizontal: wp(20),
        paddingVertical: hp(12),
        borderRadius: 100,
    },
    priceText: { fontSize: fp(16), fontWeight: '800' },
});