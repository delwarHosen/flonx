import BarCardComponents from '@/components/cardComponents/BarCardComponents'
import SearchBar from '@/components/CommonComponents/SearchBar'
import { bars } from '@/constants/data/barData'
import { Colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, Platform, StyleSheet, View } from 'react-native'; // Added Platform
import { SafeAreaView } from 'react-native-safe-area-context'

const Search: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('')

  // Filter the bars based on the query for actual search functionality
  const filteredBars = bars.filter(bar => 
    bar.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.searchWrapper}>
        <SearchBar
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
          onScanPress={() => console.log("Open Scanner")}
        />
      </View>

      <FlatList
        data={filteredBars} // Use filtered data
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BarCardComponents
            item={item}
            onPress={() => router.push({
              pathname: '/guest/shop-item',
              params: { barId: item.id }
            })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps="handled" 
      />
    </SafeAreaView>
  )
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
  },
  searchWrapper: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 10, 
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40, 
    paddingTop: 10,
  },
  // Kept your original styles below in case you need them elsewhere
  scrollContainer: {
    marginTop: 10,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  }
})