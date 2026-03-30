
import ShopDetailsScreen from '@/components/CommonComponents/ShopDetailsScreen';
import CustomLoader from '@/components/CustomLoader';
import { Colors } from '@/constants/theme';
import { useGetAllVenuesQuery } from '@/redux/services/venueApi';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function CustomerShopDetails() {
    const { barId } = useLocalSearchParams();
    const { data: venuesData, isLoading } = useGetAllVenuesQuery({});
    const barData = venuesData?.result?.find((v: any) => v._id === barId);

    if (isLoading) return <CustomLoader size={50} />;
    if (!barData) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: Colors.NEUTRAL0 }}>Venue not found!</Text>
        </View>
    );

    return (
        <ShopDetailsScreen
            name={barData.name}
            logo={barData.logo}
            ownerName={barData.venueOwner?.name}
            email={barData.email || barData.venueOwner?.email}
            phone={barData.phone || barData.venueOwner?.phone}
            address={barData.address}
        />
    );
}

// import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents';
// import CustomLoader from '@/components/CustomLoader';
// import SectionTitle from '@/components/SectionTitle';
// import { Colors } from '@/constants/theme';
// import { useGetAllVenuesQuery } from '@/redux/services/venueApi';
// import { hp, wp } from '@/utils/responsive';
// import { Image } from 'expo-image';
// import { useLocalSearchParams } from 'expo-router';
// import React from 'react';
// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const ShopDetails = () => {
//     const { barId } = useLocalSearchParams();
//     const { data: venuesData, isLoading } = useGetAllVenuesQuery({});

//     // API Response এর result অ্যারে থেকে ডাটা খোঁজা
//     const barData = venuesData?.result?.find((v: any) => v._id === barId);

//     if (isLoading) return <CustomLoader size={50} />;

//     if (!barData) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
//                 <Text style={{ color: Colors.NEUTRAL0 }}>Venue not found!</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={{ paddingVertical: hp(16) }}>
//                 <SectionTitle title='Shop Details' />
//             </View>

//             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
//                 <View style={styles.logoWrapper}>
//                     <Image
//                         source={{ uri: barData.logo }}
//                         style={styles.logo}
//                         contentFit="cover"
//                     />
//                 </View>

//                 <View style={styles.detailsList}>
//                     <DetailsCardComponents
//                         topLabel="Bar Name"
//                         bottomLabel={barData.name}
//                     />
//                     <DetailsCardComponents
//                         topLabel="Owner Name"
//                         bottomLabel={barData.venueOwner?.name || 'N/A'}
//                     />
//                     <DetailsCardComponents
//                         topLabel="Contact Email"
//                         bottomLabel={barData.email || barData.venueOwner?.email}
//                     />
//                     <DetailsCardComponents
//                         topLabel="Contact Number"
//                         bottomLabel={barData.phone || barData.venueOwner?.phone}
//                     />
//                     <DetailsCardComponents
//                         topLabel="Location"
//                         bottomLabel={barData.address}
//                     />
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default ShopDetails;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.APP_BACKGROUND,
//     },
//     scrollContent: {
//         alignItems: 'center',
//         paddingHorizontal: wp(20),
//         paddingBottom: hp(30),
//     },
//     logoWrapper: {
//         width: 100,
//         height: 100,
//         borderRadius: 20,
//         backgroundColor: '#FFFFFF',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: hp(16),
//         overflow: 'hidden',
//         borderWidth: 1,
//         borderColor: Colors.BORDER_COLOR,
//     },
//     logo: {
//         width: '100%',
//         height: '100%',
//     },
//     detailsList: {
//         width: '100%',
//     },
// });