import GigCard from '@/components/cardComponents/GigCard';
import CustomLoader from '@/components/CustomLoader';
import EmptyStateCard from '@/components/EmptyStateCardProps';
import SectionTitle from '@/components/SectionTitle';
import { Body2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useGetMyApplicationsQuery } from '@/redux/services/jobApi';
import { hp, wp } from '@/utils/responsive';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TABS = ["Applied", "Assigned", "Completed", "Cancelled"];

export default function JobsScreen() {
  const router = useRouter();

  const { initialTab } = useLocalSearchParams<{ initialTab?: string }>();

  const [activeTab, setActiveTab] = useState("Applied");
  const [tabLoading, setTabLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);


  useEffect(() => {
    if (initialTab && TABS.includes(initialTab)) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const { data: applications = [], isLoading, isFetching, refetch } = useGetMyApplicationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });


  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setTabLoading(true);
    setActiveTab(tab);
    setTimeout(() => setTabLoading(false), 400);
  };

  const showLoader = useMemo(() => {
    return isFetching && applications.length === 0 && !refreshing;
  }, [isFetching, applications, refreshing]);

  const filteredData = applications.filter((app: any) => {
    if (!app.job) return false;
    if (activeTab === "Applied") return !app.isAccepted && app.job.status === "Open";
    if (activeTab === "Assigned") return app.isAccepted && app.job.status === "Assigned";
    if (activeTab === "Completed") return app.job.status === "Completed";
    if (activeTab === "Cancelled") return app.job.status === "Cancelled";
    return false;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={{ marginVertical: hp(20) }}>
        <SectionTitle title='My Jobs' />
      </View>

      <View style={{ height: hp(60) }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabList}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
              onPress={() => handleTabChange(tab)}
            >
              <Body2 color={activeTab === tab ? Colors.NEUTRAL0 : Colors.PLACEHOLLDER_TEXT}>
                {tab}
              </Body2>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {showLoader ? (
        <View style={styles.loaderOverlay}>
          <CustomLoader size={40} />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.BRAND_PRIMARY}
              colors={[Colors.BRAND_PRIMARY]}
            />
          }
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
                    initialTab: tabMap[activeTab],
                  },
                });
              }}
            />
          )}
          ListEmptyComponent={
           <View style={{marginTop:16}}>
             <EmptyStateCard message={`No ${activeTab} Jobs found`} />
           </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  tabList: {
    paddingHorizontal: hp(20),
    alignItems: 'center',
  },
  tabItem: {
    paddingHorizontal: wp(24),
    paddingVertical: hp(10),
    borderRadius: 100,
    marginRight: 10,
    backgroundColor: Colors.INPUT_BACKGROUND,
    height: hp(45),
    justifyContent: 'center',
  },
  activeTabItem: {
    backgroundColor: Colors.BRAND_PRIMARY,
  },
  listContainer: {
    paddingHorizontal: wp(20),
    paddingBottom: "20%",
  },
});