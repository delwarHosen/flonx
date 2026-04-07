import GigCard from '@/components/cardComponents/GigCard';
import EmptyStateCard from '@/components/EmptyStateCardProps';
import SectionTitle from '@/components/SectionTitle';
import { Body2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useGetMyApplicationsQuery } from '@/redux/services/jobApi';
import { hp, wp } from '@/utils/responsive';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TABS = ["Applied", "Assigned", "Completed", "Cancelled"];
export default function JobsScreen() {
  const [activeTab, setActiveTab] = useState("Applied");
  const router = useRouter();

  // const filteredData = jobPosts.filter(job => job.status === activeTab);

  const { data: applications = [], isLoading } = useGetMyApplicationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // console.log("applications:", JSON.stringify(applications, null, 2))


  const filteredData = applications.filter((app: any) => {
    if (!app.job) return false;
    if (activeTab === "Applied") return !app.isAccepted && app.job.status === "Open";
    if (activeTab === "Assigned") return app.isAccepted && app.job.status === "Assigned";  // ← Assigned status check
    if (activeTab === "Completed") return app.job.status === "Completed";
    if (activeTab === "Cancelled") return app.job.status === "Cancelled";
    return false;
  });



  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={{ marginVertical: hp(20) }}>
        <SectionTitle title='My Jobs' />
      </View>

      {/* Tabs */}
      <View style={{ height: hp(60) }}>
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
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <GigCard
            item={item.job}
            onPress={() => {
              const tabMap: Record<string, string> = {
                'Applied': 'open',
                'Assigned': 'assigned',
                'Completed': 'completed',
                'Cancelled': 'cancelled',
              };
              router.push({
                pathname: '/bartender/jobs/job-details',
                params: {
                  id: item.job._id,         
                  applicationId: item._id,   
                  jobId: item.job._id,        
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
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND
  },

  tabList: {
    paddingHorizontal: hp(20),
    alignItems: 'center'
  },
  tabItem: {
    paddingHorizontal: wp(24),
    paddingVertical: hp(10),
    borderRadius: 100,
    marginRight: 10,
    backgroundColor: Colors.INPUT_BACKGROUND,
    height: hp(45),
    justifyContent: 'center'
  },
  activeTabItem: {
    backgroundColor: Colors.BRAND_PRIMARY,
  },
  listContainer: {
    paddingHorizontal: wp(20),
    paddingBottom: "20%",
  },

})