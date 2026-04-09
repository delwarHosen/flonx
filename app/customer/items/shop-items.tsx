
import ShopItemsScreen from '@/components/CommonComponents/ShopItemsScreen';
import CustomLoader from '@/components/CustomLoader';
import { useGetAllVenuesQuery, useGetCategoriesByVenueQuery, useGetProductsByVenueQuery } from '@/redux/services/venueApi';
import { hp } from '@/utils/responsive';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function CustomerShopItems() {
    const { barId } = useLocalSearchParams<{ barId: string }>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { data: venuesData } = useGetAllVenuesQuery({});
    const currentVenue = venuesData?.result?.find((v: any) => v._id === barId);

    const { data: categories, isLoading: isCatLoading } = useGetCategoriesByVenueQuery(barId, {
        skip: !barId,
    });

    const { data: productsData, isFetching: isProdLoading, isLoading: isProdFirstLoad, refetch } =
        useGetProductsByVenueQuery({ venueId: barId }, { skip: !barId });

    useEffect(() => {
        if (categories?.length && !selectedCategory) {
            setSelectedCategory(categories[0]._id);
        }
    }, [categories]);

    const activeItems = (productsData ?? []).filter((item: any) =>
        !selectedCategory ? true : item.category?._id === selectedCategory
    );

    if (isCatLoading || isProdFirstLoad) return <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center",marginTop:hp(100) }}>
        <CustomLoader />
    </View>;

    return (
        <ShopItemsScreen
            barId={barId}
            venue={currentVenue ? {
                _id: currentVenue._id,
                name: currentVenue.name,
                logo: currentVenue.logo,
                address: currentVenue.address,
            } : undefined}
            categories={categories}
            items={activeItems}
            isProdLoading={isProdLoading}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            isLoading={isCatLoading}
            refetch={refetch}
            paths={{
                itemDetails: '/customer/items/item-details',
                shopDetails: '/customer/items/shop-details',
                checkout: '/customer/items/checkout',
            }}
        />
    );
}


// import { OrderTabIcon } from '@/assets/images/icons/icon';
// import BarCardComponents from '@/components/cardComponents/BarCardComponents';
// import ItemCard from '@/components/cardComponents/ItemCard';
// import CustomLoader from '@/components/CustomLoader';
// import EmptyStateCard from '@/components/EmptyStateCardProps';
// import SectionTitle from '@/components/SectionTitle';
// import { Body3, Body4, Caption1, Caption4 } from '@/components/typo/Typography';
// import { Colors } from '@/constants/theme';
// import {
//     useGetAllVenuesQuery,
//     useGetCategoriesByVenueQuery,
//     useGetProductsByVenueQuery,
// } from '@/redux/services/venueApi';
// import { fp, hp, wp } from '@/utils/responsive';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//     ActivityIndicator,
//     FlatList,
//     Platform,
//     StyleSheet,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// const ShopItems = () => {
//     const router = useRouter();
//     const insets = useSafeAreaInsets();
//     const { barId } = useLocalSearchParams<{ barId: string }>();

//     const [cart, setCart] = useState<{ [key: string]: number }>({});
//     const [showModal, setShowModal] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//     // To avoid loading flicker when switching categories
//     const isFirstLoad = useRef(true);

//     // ── Venue ──────────────────────────────────────────────────────────────
//     const { data: venuesData } = useGetAllVenuesQuery({});
//     const currentVenue = venuesData?.result?.find((v: any) => v._id === barId);

//     // ── Categories ─────────────────────────────────────────────────────────
//     const { data: categories, isLoading: isCatLoading } = useGetCategoriesByVenueQuery(barId, {
//         skip: !barId,
//     });

//     // Auto-select the first category when categories are loaded
//     useEffect(() => {
//         if (categories && categories.length > 0 && !selectedCategory) {
//             setSelectedCategory(categories[0]._id);
//             isFirstLoad.current = false;
//         }
//     }, [categories]);

//     // ── Products ───────────────────────────────────────────────────────────
//     // If selectedCategory is null, do not send the category param → fetch all products
//     // If selectedCategory is set, fetch products of that category
//     // Instead of filtering on the backend, fetch all products and filter on the client side
//     const {
//         data: productsData,
//         isFetching: isProdLoading,
//         isLoading: isProdFirstLoad,
//     } = useGetProductsByVenueQuery(
//         { venueId: barId },
//         { skip: !barId }
//     );

//     // Filter on the client side using selectedCategory
//     const activeItems: any[] = (productsData ?? []).filter((item: any) => {
//         if (!selectedCategory) return true;
//         return item.category?._id === selectedCategory;
//     });

//     // ── Cart helpers ───────────────────────────────────────────────────────
//     const handleAddToCart = (item: any) => {
//         setCart(prev => ({ ...prev, [item._id]: (prev[item._id] || 0) + 1 }));
//         setShowModal(true);
//     };

//     const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

//     const totalPrice = activeItems.reduce((sum: number, item: any) => {
//         const quantity = cart[item._id] || 0;
//         return sum + (quantity * (item.price || 0));
//     }, 0);

//     // ── Loading ────────────────────────────────────────────────────────────
//     if (isCatLoading || isProdFirstLoad) return <CustomLoader />;

//     // ── Render ─────────────────────────────────────────────────────────────
//     return (
//         <SafeAreaView style={styles.container} edges={['top']}>
//             <View style={styles.headerWrapper}>
//                 <SectionTitle title="Shop Item" />
//             </View>

//             <FlatList
//                 data={activeItems}
//                 keyExtractor={(item) => item._id}
//                 renderItem={({ item }) => (
//                     <ItemCard
//                         item={{
//                             name: item.name,
//                             img: item.image,
//                             price: item.price,
//                             ingredients: item.tags?.length
//                                 ? item.tags
//                                 : [item.description].filter(Boolean),
//                         }}
//                         isInCart={!!cart[item._id]}
//                         onAdd={() => handleAddToCart(item)}
//                         onPress={() =>
//                             router.push({
//                                 pathname: '/customer/items/item-details',
//                                 params: {
//                                     itemId: item._id,
//                                     barId: barId as string,
//                                     itemName: item.name,
//                                     itemImg: item.image,
//                                     itemPrice: String(item.price),
//                                     itemIngredients: item.tags?.length
//                                         ? item.tags.join(', ')
//                                         : item.description || '',
//                                     itemStatus: item.isAvailable ? 'in_stock' : 'out_of_stock',
//                                 },
//                             })
//                         }
//                     />
//                 )}
//                 ListHeaderComponent={
//                     <View>
//                         {/* Venue card */}
//                         {currentVenue && (
//                             <BarCardComponents
//                                 item={{
//                                     name: currentVenue.name,
//                                     logo: currentVenue.logo,
//                                     status: 'open',
//                                     location: currentVenue.address,
//                                 }}
//                                 onPress={() =>
//                                     router.push({
//                                         pathname: '/customer/items/shop-details',
//                                         params: { barId: currentVenue._id },
//                                     })
//                                 }
//                             />
//                         )}

//                         {/* Category tabs */}
//                         {categories && categories.length > 0 && (
//                             <View style={{ marginVertical: hp(15) }}>
//                                 <FlatList
//                                     horizontal
//                                     data={categories}
//                                     showsHorizontalScrollIndicator={false}
//                                     keyExtractor={(cat) => cat._id}
//                                     contentContainerStyle={{ paddingRight: wp(20) }}
//                                     renderItem={({ item: cat }) => {
//                                         const isSelected = selectedCategory === cat._id;
//                                         return (
//                                             <TouchableOpacity
//                                                 onPress={() => setSelectedCategory(cat._id)}
//                                                 style={[styles.tab, isSelected && styles.activeTab]}
//                                             >
//                                                 <Body3
//                                                     style={{
//                                                         color: isSelected ? '#FFF' : Colors.OTP_COLOR,
//                                                     }}
//                                                 >
//                                                     {cat.name}
//                                                 </Body3>
//                                             </TouchableOpacity>
//                                         );
//                                     }}
//                                 />
//                             </View>
//                         )}

//                         {/* category switch loading indicator — list এর উপরে */}
//                         {isProdLoading && (
//                             <ActivityIndicator
//                                 color={Colors.BRAND_PRIMARY}
//                                 style={{ marginVertical: hp(10) }}
//                             />
//                         )}
//                     </View>
//                 }
//                 ListEmptyComponent={
//                     !isProdLoading ? (
//                         <View style={{ marginTop: 20 }}>
//                             <EmptyStateCard message='No Items Found' />
//                         </View>
//                     ) : null
//                 }
//                 contentContainerStyle={[
//                     styles.listContent,
//                     { paddingBottom: showModal ? 120 : 40 },
//                 ]}
//             />

//             {/* Cart summary bar */}
//             {showModal && totalItems > 0 && (
//                 <View
//                     style={[
//                         styles.modalOverlay,
//                         {
//                             bottom: Platform.OS === 'ios' ? insets.bottom + 10 : '5%',
//                         },
//                     ]}
//                 >
//                     <View style={styles.modalContent}>
//                         <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
//                             <View style={styles.cartBadge}>
//                                 <OrderTabIcon />
//                             </View>
//                             <View>
//                                 <Body4 color="#FFF" style={{ marginBottom: 2 }}>
//                                     {totalItems} Items
//                                 </Body4>
//                                 <Caption1 color="#1D1733" style={styles.priceText}>
//                                     ${totalPrice}
//                                 </Caption1>
//                             </View>
//                         </View>

//                         <TouchableOpacity
//                             style={styles.checkoutBtn}
//                             onPress={() => {
//                                 // cart = { [itemId]: quantity }
//                                 // cartItems = full item info array with quantity
//                                 const cartItems = activeItems
//                                     .filter((item: any) => cart[item._id])
//                                     .map((item: any) => ({
//                                         _id: item._id,
//                                         name: item.name,
//                                         image: item.image,
//                                         price: item.price,
//                                         tags: item.tags || [],
//                                         description: item.description || '',
//                                         isAvailable: item.isAvailable,
//                                         quantity: cart[item._id],
//                                     }));
//                                 router.push({
//                                     pathname: '/customer/items/checkout',
//                                     params: {
//                                         cartData: JSON.stringify(cartItems),
//                                         barId: barId as string,
//                                     },
//                                 });
//                             }}
//                         >
//                             <Caption4 color="#1D1733">Checkout</Caption4>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             )}
//         </SafeAreaView>
//     );
// };

// export default ShopItems;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.APP_BACKGROUND,
//     },
//     headerWrapper: {
//         paddingVertical: hp(20),
//     },
//     tab: {
//         paddingHorizontal: wp(20),
//         paddingVertical: hp(7),
//         borderRadius: 100,
//         backgroundColor: Colors.INPUT_BACKGROUND,
//         marginRight: wp(10),
//         borderWidth: 1,
//         borderColor: Colors.BORDER_COLOR,
//         minWidth: wp(80),
//     },
//     activeTab: {
//         backgroundColor: Colors.BRAND_PRIMARY,
//         borderColor: Colors.BRAND_PRIMARY,
//     },
//     listContent: {
//         paddingHorizontal: wp(20),
//     },
//     modalOverlay: {
//         position: 'absolute',
//         left: 20,
//         right: 20,
//         backgroundColor: Colors.BRAND_PRIMARY,
//         borderRadius: 100,
//         padding: 20,
//         borderWidth: 1.5,
//         borderColor: Colors.NEUTRAL0,
//         elevation: 8,
//     },
//     modalContent: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     cartBadge: {
//         width: 40,
//         height: 40,
//         borderRadius: 10,
//         borderWidth: 0.8,
//         borderColor: Colors.NEUTRAL0,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     checkoutBtn: {
//         backgroundColor: Colors.NEUTRAL0,
//         paddingHorizontal: wp(20),
//         paddingVertical: hp(12),
//         borderRadius: 100,
//     },
//     priceText: {
//         fontSize: fp(16),
//         fontWeight: '800',
//     },
// });