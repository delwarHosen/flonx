import ShopItemsScreen from '@/components/CommonComponents/ShopItemsScreen';
import { Colors } from '@/constants/theme';
import { useGetAllVenuesQuery, useGetCategoriesByVenueQuery, useGetProductsByVenueQuery } from '@/redux/services/venueApi';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function CustomerShopItems() {
    const { barId } = useLocalSearchParams<{ barId: string }>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    
    const { data: venuesData } = useGetAllVenuesQuery({});
    const currentVenue = venuesData?.result?.find((v: any) => v._id === barId);

    
    const { data: categories, isLoading: isCatLoading } = useGetCategoriesByVenueQuery(barId, {
        skip: !barId,
    });

  
    const {
        data: productsData,
        isFetching,     
        isLoading,       
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

    
    if ((isLoading || isCatLoading) && !isFetching) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                <ActivityIndicator color={Colors.BRAND_PRIMARY} size="large" />
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
           
            isLoading={isFetching} 
          
            isProdLoading={false} 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            refetch={refetch}
            paths={{
                itemDetails: '/customer/items/item-details',
                shopDetails: '/customer/items/shop-details',
                checkout: '/customer/items/checkout',
            }}
        />
    );
}