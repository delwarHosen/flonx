import GigCard from '@/components/cardComponents/GigCard';
import EmptyStateCard from '@/components/EmptyStateCardProps';
import SectionTitle from '@/components/SectionTitle';
import { Body2 } from '@/components/typo/Typography';
import { getJobs } from '@/constants/data/getJobs';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TABS = ["Active", "Assigned", "Completed", "Cancelled"];
export default function JobsScreen() {
  const [activeTab, setActiveTab] = useState("Active");
  const router = useRouter();

  // const filteredData = jobPosts.filter(job => job.status === activeTab);

  const filteredData = getJobs.filter(job => {
    if (activeTab === "Active") {
      return job.status === "Open";
    }
    return job.status === activeTab;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View>
        <SectionTitle title='My Jobs' />
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
          <GigCard
            item={item}
            onPress={() => {
              // mapping tab name to job-details switch case
              const tabMap: Record<string, string> = {
                'Active': 'open',
                'Assigned': 'assigned',
                'Completed': 'completed',
                'Cancelled': 'cancelled',
              };

              router.push({
                pathname: '/bartender/jobs/job-details',
                params: {
                  id: item.id,
                  initialTab: tabMap[activeTab]
                },
              });
            }}
          />
        )}
        ListEmptyComponent={
          <EmptyStateCard
            message={`No ${activeTab} Jobs found`}
          />
        }

      />

    </SafeAreaView>
  );
};


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
    paddingBottom: "20%",
  },

})