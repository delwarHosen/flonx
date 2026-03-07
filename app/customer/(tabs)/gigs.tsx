import { Body2, Caption1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PlusWithBorderIcon } from '@/assets/images/icons/BarRelatedIcon/PlusWithBorderIcon';
import GigCard from '@/components/cardComponents/GigCard';
import { CustomButton } from '@/components/CustomButton';
import EmptyStateCard from '@/components/EmptyStateCardProps';
import SectionTitle from '@/components/SectionTitle';
import { jobPosts } from '@/constants/data/jobPosts';
import { useRouter } from 'expo-router';

const TABS = ["Active", "Assigned", "Completed", "Cancelled"];

const GigsScreen = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const router = useRouter();
  // const filteredData = jobPosts.filter(job => job.status === activeTab);

  const filteredData = jobPosts.filter(job => {
    if (activeTab === "Active") {
      return job.status === "Open";
    }
    return job.status === activeTab;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View>
        <SectionTitle title='Gigs' />
      </View>

      {/* Tabs */}
      <View style={{ height: 60 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabList}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabItem,
                activeTab === tab && styles.activeTabItem
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Body2 color={activeTab === tab ? Colors.NEUTRAL0 : Colors.PLACEHOLLDER_TEXT}>
                {tab}
              </Body2>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <GigCard item={item} onPress={() => {
            const tabMap: Record<string, string> = {
              'Active': 'open',
              'Assigned': 'assigned',
              'Completed': 'completed',
              'Cancelled': 'cancelled',
            };
            router.push({
              pathname: '/customer/gigs-related/gig-details',
              params: {
                id: item.id,
                // initialTab: 'open'
                initialTab: tabMap[activeTab]
              },
            });
          }}
          />
        )}
        ListEmptyComponent={
          <EmptyStateCard
            message={`No ${activeTab} Gigs found`}
          />
        }
        ListFooterComponent={
          <CreatGig />
        }
      />

      {/* Floating Create Button */}

    </SafeAreaView>
  );
};


const CreatGig = () => {
  const router = useRouter();
  return (
    <View style={styles.createCard}>
      <View style={""}>
        <Body2 color={Colors.NEUTRAL0}>Create a New Gig</Body2>
        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginTop: 8 }}>
          Provide the details to publish your job.
        </Caption1>
      </View>

      <View
      // style={{ marginTop:-10 }}
      >
        <CustomButton
          onPress={() => router.push('/customer/gigs-related/add-gig')}
          icon={<PlusWithBorderIcon />}
          width={36}
          height={36}
          borderRadius={100}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },

  tabList: { paddingHorizontal: 20, alignItems: 'center' },
  tabItem: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 100,
    marginRight: 10,
    backgroundColor: Colors.INPUT_BACKGROUND,
    height: 45,
    justifyContent: 'center'
  },
  activeTabItem: {
    backgroundColor: Colors.BRAND_PRIMARY,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  emptyContainer: {
    alignItems: 'center',
  },

  createCard: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    marginTop: 16,
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },

});

export default GigsScreen;