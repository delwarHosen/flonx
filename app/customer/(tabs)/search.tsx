// import BarCardComponents from '@/components/cardComponents/BarCardComponents'
// import SearchBar from '@/components/CommonComponents/SearchBar'
// import CustomLoader from '@/components/CustomLoader'
// import { Body1 } from '@/components/typo/Typography'
// import { Colors } from '@/constants/theme'
// import { useGetAllVenuesQuery } from '@/redux/services/venueApi'
// import { hp, wp } from '@/utils/responsive'
// import { useRouter } from 'expo-router'
// import React, { useEffect, useState } from 'react'
// import { FlatList, StyleSheet, View } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'

import VenueSearch from "@/components/CommonComponents/VenueSearch";

// // Define a functional component type
// const Search: React.FC = () => {
//   const router = useRouter();
//   const [query, setQuery] = useState<string>('');
//   const [debouncedQuery, setDebouncedQuery] = useState('');

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(query);
//     }, 500);

//     return () => clearTimeout(handler);
//   }, [query]);

//   // RTK Query Hook
//   const { data, isLoading, isFetching } = useGetAllVenuesQuery({
//     searchTerm: debouncedQuery,
//   });

//   const venues = data?.result || [];

//   // const filteredBars = bars.filter(bar =>
//   //   bar.name.toLowerCase().includes(query.toLowerCase())
//   // );


//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <SearchBar
//           placeholder="Search"
//           value={query}
//           onChangeText={setQuery}
//           onScanPress={() => console.log("Open Scanner")}
//         />
//       </View>

//       <View style={{ marginTop: hp(16) }}>
//         {(isLoading || isFetching) && !venues.length ? (
//           <View style={{ alignItems: "center" }}>
//             <CustomLoader size={50} />
//           </View>
//         ) : (
//           <FlatList
//             data={venues}
//             keyExtractor={(item) => item._id}
//             renderItem={({ item }) => (
//               <BarCardComponents
//                 item={{
//                   name: item.name,
//                   logo: item.logo, 
//                   status: "close",
//                   location: item.address,
//                 }}
//                 onPress={() => router.push({
//                   pathname: '/customer/items/shop-items',
//                   params: { barId: item._id }
//                 })}
//               />
//             )}
//             ListEmptyComponent={<Body1 style={{ color: Colors.NEUTRAL0 }}>No venues found</Body1>}
//             contentContainerStyle={{ paddingBottom: hp(20), marginTop: hp(16) }}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   )
// }

// export default Search;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: wp(20),
//     backgroundColor: Colors.APP_BACKGROUND,
//     marginTop: hp(20)
//   },
//   scrollContainer: {
//     marginTop: hp(10),
//   },
//   scrollContent: {
//     flexGrow: 1,
//     alignItems: "center",
//     paddingBottom: hp(20),
//   }
// })



export default function Search() {
    return <VenueSearch shopItemPath="/customer/items/shop-items" requireAuth={true} />
}