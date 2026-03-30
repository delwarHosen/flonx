import VenueSearch from "@/components/CommonComponents/VenueSearch";


export default function Search() {
    return <VenueSearch shopItemPath="/guest/shop-item" requireAuth={false} />
}

// import BarCardComponents from '@/components/cardComponents/BarCardComponents'
// import SearchBar from '@/components/CommonComponents/SearchBar'
// import { bars } from '@/constants/data/barData'
// import { Colors } from '@/constants/theme'
// import { hp, wp } from '@/utils/responsive'
// import { useRouter } from 'expo-router'
// import React, { useState } from 'react'
// import { FlatList, Platform, StyleSheet, View } from 'react-native'; // Added Platform
// import { SafeAreaView } from 'react-native-safe-area-context'

// const Search: React.FC = () => {
//   const router = useRouter();
//   const [query, setQuery] = useState<string>('')

//   // Filter the bars based on the query for actual search functionality
//   const filteredBars = bars.filter(bar => 
//     bar.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
//       <View style={styles.searchWrapper}>
//         <SearchBar
//           placeholder="Search"
//           value={query}
//           onChangeText={setQuery}
//           onScanPress={() => console.log("Open Scanner")}
//         />
//       </View>

//       <FlatList
//         data={filteredBars} // Use filtered data
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <BarCardComponents
//             item={item}
//             onPress={() => router.push({
//               pathname: '/guest/shop-item',
//               params: { barId: item.id }
//             })}
//           />
//         )}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         // keyboardShouldPersistTaps="handled" 
//       />
//     </SafeAreaView>
//   )
// }

// export default Search;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.APP_BACKGROUND,
//   },
//   searchWrapper: {
//     paddingHorizontal: wp(20),
//     paddingTop: Platform.OS === 'ios' ? hp(10) : hp(10), 
//     marginBottom: hp(10),
//   },
//   listContent: {
//     paddingHorizontal: wp(20),
//     paddingBottom: hp(40), 
//     paddingTop: hp(10),
//   },
//   // Kept your original styles below in case you need them elsewhere
//   scrollContainer: {
//     marginTop: hp(10),
//   },
//   scrollContent: {
//     flexGrow: 1,
//     alignItems: "center",
//     paddingBottom: hp(20),
//   }
// })