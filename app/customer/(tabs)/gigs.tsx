import { Body2, Caption1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PlusWithBorderIcon } from '@/assets/images/icons/BarRelatedIcon/PlusWithBorderIcon';
import GigCard from '@/components/cardComponents/GigCard';
import { CustomButton } from '@/components/CustomButton';
import CustomLoader from '@/components/CustomLoader';
import EmptyStateCard from '@/components/EmptyStateCardProps';
import SectionTitle from '@/components/SectionTitle';
import { useGetMyJobsQuery } from '@/redux/services/jobApi';
import { hp, wp } from '@/utils/responsive';
import { useLocalSearchParams, useRouter } from 'expo-router';

const TABS = ["Active", "Assigned", "Completed", "Cancelled"];

const tabTypeMap: Record<string, string> = {
  'Active': 'open',
  'Assigned': 'assigned',
  'Completed': 'completed',
  'Cancelled': 'cancelled',
};

const GigsScreen = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // tab reset
  const { resetTab } = useLocalSearchParams<{ resetTab?: string }>();
  useEffect(() => {
    if (resetTab) {
      setActiveTab(resetTab);
    }
  }, [resetTab]);


  const { data, isLoading, isFetching, refetch } = useGetMyJobsQuery(
    { type: tabTypeMap[activeTab] },
    { refetchOnMountOrArgChange: true }
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);



  const filteredData = (data?.result || [])
    .filter((job: any) => {
      if (activeTab === 'Active') return job.status === 'Open';
      if (activeTab === 'Assigned') return job.status === 'Assigned';
      if (activeTab === 'Completed') return job.status === 'Completed';
      if (activeTab === 'Cancelled') return job.status === 'Cancelled';
      return true;
    })
    .sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  // console.log("filteredData:", filteredData.map((j: any) => ({ id: j._id, status: j.status })));


  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={{ paddingVertical: hp(10) }}>
        <SectionTitle title='Gigs' />
      </View>

      <View style={{ height: hp(60) }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabList}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
              onPress={() => setActiveTab(tab)}
            >
              <Body2 color={activeTab === tab ? Colors.NEUTRAL0 : Colors.PLACEHOLLDER_TEXT}>
                {tab}
              </Body2>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>


      {isLoading && !refreshing ? (
        <View style={styles.loaderContainer}>
          <CustomLoader />
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
              item={item}
              onPress={() => {

                router.push({
                  pathname: '/customer/gigs-related/gig-details',
                  params: {
                    id: item._id,
                    initialTab: tabTypeMap[activeTab]
                  },
                });
              }}
            />
          )}
          ListEmptyComponent={
            !isLoading ? (
              <EmptyStateCard message={`No ${activeTab} Gigs found`} />
            ) : null
          }
          ListFooterComponent={!isLoading ? <CreatGig /> : null}
        />
      )}
    </SafeAreaView>
  );
};

const CreatGig = () => {
  const router = useRouter();
  return (
    <View style={styles.createCard}>
      <View>
        <Body2 color={Colors.NEUTRAL0}>Create a New Gig</Body2>
        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginTop: hp(8) }}>
          Provide the details to publish your job.
        </Caption1>
      </View>
      <View>
        <CustomButton
          onPress={() => router.push('/customer/gigs-related/add-gig')}
          icon={<PlusWithBorderIcon />}
          width={36}
          height={36}
          borderRadius={100}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND
  },
  tabList: {
    paddingHorizontal: wp(20),
    alignItems: 'center',
  },
  tabItem: {
    paddingHorizontal: wp(24),
    paddingVertical: hp(10),
    borderRadius: 100,
    marginRight: wp(10),
    backgroundColor: Colors.INPUT_BACKGROUND,
    height: hp(45),
    justifyContent: 'center'
  },
  activeTabItem: {
    backgroundColor: Colors.BRAND_PRIMARY,
  },
  listContainer: {
    paddingHorizontal: wp(20),
    paddingBottom: 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createCard: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    marginTop: hp(16),
    padding: 14,
    borderRadius: 10,
    marginBottom: hp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },
});

export default GigsScreen;