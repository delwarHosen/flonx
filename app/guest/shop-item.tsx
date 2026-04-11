import ShopItemsScreen from '@/components/CommonComponents/ShopItemsScreen';
import { Colors } from '@/constants/theme';
import { useGetAllVenuesQuery, useGetCategoriesByVenueQuery, useGetProductsByVenueQuery } from '@/redux/services/venueApi';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function GuestShopItem() {
    const { barId } = useLocalSearchParams<{ barId: string }>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { data: venuesData } = useGetAllVenuesQuery({});
    const currentVenue = venuesData?.result?.find((v: any) => v._id === barId);

    const { data: categories, isLoading: isCatLoading } = useGetCategoriesByVenueQuery(barId, {
        skip: !barId,
    });

    const {
        data: productsData,
        isFetching: isProdFetching,
        isLoading: isProdFirstLoad,
        refetch
    } = useGetProductsByVenueQuery({ venueId: barId }, { skip: !barId });

    useEffect(() => {
        if (categories?.length && !selectedCategory) {
            setSelectedCategory(categories[0]._id);
        }
    }, [categories]);

    const activeItems = (productsData ?? []).filter((item: any) =>
        !selectedCategory ? true : item.category?._id === selectedCategory
    );

    if ((isCatLoading || isProdFirstLoad) && !isProdFetching) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={Colors.BRAND_PRIMARY} />
            </View>
        );
    }

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
            isProdLoading={isProdFetching}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            isLoading={isProdFetching}
            refetch={refetch}
            paths={{
                itemDetails: '/guest/item-details',
                shopDetails: '/guest/shop-details',
                checkout: '/guest/checkout',
            }}
        />
    );
}