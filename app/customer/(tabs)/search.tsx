import BarCardComponents from '@/components/cardComponents/BarCardComponents'
import SearchBar from '@/components/CommonComponents/SearchBar'
import { bars } from '@/constants/data/barData'
import { Colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// Define a functional component type
const Search: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  const filteredBars = bars.filter(bar =>
    bar.name.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchBar
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
          onScanPress={() => console.log("Open Scanner")}
        />
      </View>


      <View style={{ marginTop: "4%" }}>
        <FlatList
          data={filteredBars}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BarCardComponents
              item={item}
              onPress={() => router.push({
                pathname: '/customer/items/shop-items',
                params: { barId: item.id }
              })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}

export default Search;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.APP_BACKGROUND,
    marginTop: "5%"
  },
  scrollContainer: {
    marginTop: 10,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  }
})