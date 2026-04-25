import ShopItemsScreen from '@/components/CommonComponents/ShopItemsScreen';
import CustomLoader from '@/components/CustomLoader';
import {
    useGetCategoriesByVenueQuery,
    useGetProductsByVenueQuery,
    useGetVenueByIdQuery,
} from '@/redux/services/venueApi';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function GuestShopItem() {
    const { barId } = useLocalSearchParams<{ barId: string }>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    //  useGetVenueByIdQuery use koro — getAllVenues call kora expensive & unnecessary
    const { data: currentVenue } = useGetVenueByIdQuery(barId, { skip: !barId });

    const { data: categoryData, isLoading: isCatLoading } = useGetCategoriesByVenueQuery(barId, {
        skip: !barId,
    });

    // categories response: { meta, result: [...] }
    const categories = categoryData?.result ?? [];

    // Auto-select first category
    useEffect(() => {
        if (categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]._id);
        }
    }, [categories]);

    // categoryId API-level e pass koro — client-side filter lagbe na
    const {
        data: productsData = [],
        isFetching: isProdFetching,
        isLoading: isProdFirstLoad,
        refetch,
    } = useGetProductsByVenueQuery(
        { venueId: barId, categoryId: selectedCategory ?? undefined },
        { skip: !barId }
    );

    if (isCatLoading || isProdFirstLoad) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomLoader size={40}/>
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
            items={productsData}
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