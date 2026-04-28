import { Body2, Caption1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [page, setPage] = useState(1);
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();
  const { activeTab: paramTab } = useLocalSearchParams<{ activeTab: string }>();

  // ── param tab sync ───────────────────────────────────────────────
  useEffect(() => {
    if (paramTab) setActiveTab(paramTab);
  }, [paramTab]);

  // ── Location fetch ───────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const location = await Location.getCurrentPositionAsync({});
      setCoords({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    })();
  }, []);

  // ── API call — coords না থাকলেও call হবে ─────────────────────────
  const { data: jobsData, isLoading, isFetching, refetch } = useGetMyJobsQuery(
    {
      type: tabTypeMap[activeTab],
      ...(coords ? { lat: coords.lat, lng: coords.lng } : {}),
      page,
    },
    { refetchOnMountOrArgChange: true }
  );

  // ── Pagination accumulation ──────────────────────────────────────
  useEffect(() => {
    if (!jobsData?.result?.length) {
      if (jobsData && page === 1) {
        setAllJobs([]);
        setHasMore(false);
      }
      if (refreshing) setRefreshing(false);
      return;
    }

    if (page === 1) {
      setAllJobs(jobsData.result);
    } else {
      setAllJobs(prev => {
        const existingIds = new Set(prev.map((j: any) => j._id));
        const newJobs = jobsData.result.filter((j: any) => !existingIds.has(j._id));
        return [...prev, ...newJobs];
      });
    }

    const { total, limit } = jobsData.meta;
    setHasMore(page * limit < total);

    if (refreshing) setRefreshing(false);

  }, [jobsData]);

  // ── Tab change → reset ───────────────────────────────────────────
  useEffect(() => {
    setPage(1);
    setAllJobs([]);
    setHasMore(true);
  }, [activeTab]);

  // ── Load more ────────────────────────────────────────────────────
  const handleLoadMore = () => {
    if (!isFetching && !isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // ── Pull to refresh ──────────────────────────────────────────────
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    await refetch();
  }, [refetch]);

  const isInitialLoading = isLoading && page === 1 && !refreshing;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={{ paddingVertical: hp(10) }}>
        <SectionTitle title='Gigs' />
      </View>

      {/* ── Tabs ── */}
      <View style={{ height: hp(60) }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabList}
        >
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

      {/* ── Initial loader overlay ── */}
      {isInitialLoading && (
        <View style={styles.loaderOverlay}>
          <CustomLoader size={40} />
        </View>
      )}

      {/* ── List ── */}
      <FlatList
        data={allJobs}
        keyExtractor={(item) => item._id}
        contentContainerStyle={[styles.listContainer, { flexGrow: 1 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.BRAND_PRIMARY}
            colors={[Colors.BRAND_PRIMARY]}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching && !refreshing && page > 1 ? (
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <CustomLoader size={30} />
            </View>
          ) : !isFetching ? (
            <CreatGig />
          ) : null
        }
        ListEmptyComponent={
          !isInitialLoading && !isFetching ? (
            <EmptyStateCard message={`No ${activeTab} Gigs found`} />
          ) : null
        }
        renderItem={({ item }) => (
          <GigCard
            item={item}
            onPress={() => {
              router.push({
                pathname: '/customer/gigs-related/gig-details',
                params: {
                  id: item._id,
                  initialTab: tabTypeMap[activeTab],
                },
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const CreatGig = () => {
  const router = useRouter();
  return (
    <View style={styles.createCard}>
      <View style={{ flex: 1, marginRight: wp(10), justifyContent: 'center' }}>
        <Body2 color={Colors.NEUTRAL0}>Create a New Gig</Body2>
        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginTop: hp(8) }}>
          Provide the details to publish your job.
        </Caption1>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <CustomButton
          onPress={() => router.push('/customer/gigs-related/add-gig')}
          icon={<PlusWithBorderIcon />}
          width={40}
          height={40}
          borderRadius={100}
          style={{ margin: 0 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
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
    justifyContent: 'center',
  },
  activeTabItem: {
    backgroundColor: Colors.BRAND_PRIMARY,
  },
  listContainer: {
    paddingHorizontal: wp(20),
    paddingBottom: hp(20),
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
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
    minHeight: hp(80),
  },
});

export default GigsScreen;