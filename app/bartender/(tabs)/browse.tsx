import { Body1, Body3 } from '@/components/typo/Typography';
import { IMAGE_COMPONENTS } from '@/constants/image.index';
import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GigCard from '@/components/cardComponents/GigCard';
import SearchBar from '@/components/CommonComponents/SearchBar';
import CustomLoader from '@/components/CustomLoader';
import EmptyStateCard from '@/components/EmptyStateCardProps';
import NotificationBell from '@/components/Profile/NotificationBell';
import FilterModal from '@/components/QRScannerModal/FilterModal';
import { useGetProfileQuery } from '@/redux/services/authApi';
import { useGetAllJobsQuery, useGetMyApplicationsQuery } from '@/redux/services/jobApi';
import { hp, wp } from '@/utils/responsive';

const BrowseScreen: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string>('');
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [allJobs, setAllJobs] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const router = useRouter();
    const { data: profile } = useGetProfileQuery({});

    // ── Location ──────────────────────────────────────────────────────
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

    // ── API ───────────────────────────────────────────────────────────
    const {
        data: jobsData,
        isLoading: jobsLoading,
        isFetching: jobsFetching,
        refetch,
    } = useGetAllJobsQuery({
        searchTerm: query,
        lat: coords?.lat,
        lng: coords?.lng,
        page,
        maxDistance: 20,
    }, {
        refetchOnMountOrArgChange: true,
        skip: !coords,
    });

    const {
        data: applications = [],
        isLoading: appsLoading,
    } = useGetMyApplicationsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const appliedJobIds = new Set(
        applications
            .filter((app: any) => app.job)
            .map((app: any) => app.job._id)
    );

    // ── Pagination accumulation ───────────────────────────────────────
    useEffect(() => {
        if (!jobsData?.result?.length) {
            if (jobsData && page === 1) {
                setAllJobs([]);
                setHasMore(false);
            }
            if (refreshing) setRefreshing(false);
            return;
        }

        const filtered = jobsData.result.filter(
            (job: any) => !appliedJobIds.has(job._id)
        );

        if (page === 1) {
            setAllJobs(filtered);
        } else {
            setAllJobs(prev => {
                const existingIds = new Set(prev.map((j: any) => j._id));
                const newJobs = filtered.filter((j: any) => !existingIds.has(j._id));
                return [...prev, ...newJobs];
            });
        }

        const { total, limit } = jobsData.meta;
        setHasMore(page * limit < total);

        if (refreshing) setRefreshing(false);

    }, [jobsData, applications]);

    // ── Query change → reset ──────────────────────────────────────────
    useEffect(() => {
        setPage(1);
        setAllJobs([]);
        setHasMore(true);
    }, [query]);

    // ── Coords change → reset ─────────────────────────────────────────
    useEffect(() => {
        if (coords) {
            setPage(1);
            setAllJobs([]);
            setHasMore(true);
        }
    }, [coords]);

    // ── Load more ─────────────────────────────────────────────────────
    const handleLoadMore = () => {
        if (!jobsFetching && !jobsLoading && hasMore) {
            setPage(prev => prev + 1);
        }
    };

    // ── Pull to refresh ───────────────────────────────────────────────
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setPage(1);
        setHasMore(true);

        try {
            if (coords) {
                await refetch();
            } else {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status === 'granted') {
                    const location = await Location.getCurrentPositionAsync({});
                    setCoords({
                        lat: location.coords.latitude,
                        lng: location.coords.longitude,
                    });
                } else {
                    setRefreshing(false);
                }
            }
        } catch (error) {
            console.error('Refresh failed:', error);
            setRefreshing(false);
        }
    }, [refetch, coords]);

    const isInitialLoading = (jobsLoading || appsLoading || !coords) && page === 1 && !refreshing;

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" />

            {/* Sticky header */}
            <View style={styles.stickyHeader}>
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <TouchableOpacity onPress={() => router.push('/bartender/profile')}>
                            <Image
                                source={
                                    profile?.profile_image
                                        ? { uri: profile.profile_image }
                                        : IMAGE_COMPONENTS.profileImg
                                }
                                style={styles.avatar}
                            />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 12 }}>
                            <Body1 italic color={Colors.NEUTRAL0} weight="bold">
                                Hello {profile?.name || 'User'}
                            </Body1>
                            <Body3 italic style={{ marginTop: hp(8) }} color={Colors.PLACEHOLLDER_TEXT}>
                                Welcome to FLÖNX
                            </Body3>
                        </View>
                    </View>
                    <NotificationBell notificationPath="/bartender/profile/notification" />
                </View>
                <View style={{ marginTop: hp(12) }}>
                    <SearchBar
                        placeholder="Search"
                        value={query}
                        onChangeText={setQuery}
                        showFilter={true}
                        onScanPress={() => setFilterVisible(true)}
                    />
                </View>
            </View>

            {/* Content */}
            {isInitialLoading ? (
                <View style={styles.loaderContainer}>
                    <CustomLoader size={40} />
                </View>
            ) : (
                <FlatList
                    data={allJobs}
                    keyExtractor={(item) => item._id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={Colors.BRAND_PRIMARY}
                            colors={[Colors.BRAND_PRIMARY]}
                        />
                    }
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        jobsFetching && !refreshing && page > 1 ? (
                            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                                <CustomLoader size={30} />
                            </View>
                        ) : null
                    }
                    ListEmptyComponent={
                        !jobsFetching ? (
                            <EmptyStateCard message="No jobs available at the moment" />
                        ) : null
                    }
                    renderItem={({ item }) => (
                        <GigCard
                            item={item}
                            onPress={() => {
                                router.push({
                                    pathname: '/bartender/jobs/browse-details',
                                    params: { id: item._id },
                                });
                            }}
                        />
                    )}
                />
            )}

            <FilterModal
                visible={filterVisible}
                onClose={() => setFilterVisible(false)}
                onSelect={(option) => setSelectedFilter(option)}
                selected={selectedFilter}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    stickyHeader: {
        paddingHorizontal: wp(20),
        paddingTop: hp(20),
        paddingBottom: hp(12),
        backgroundColor: Colors.APP_BACKGROUND,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingHorizontal: wp(20),
        paddingBottom: hp(20),
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 43,
        height: 43,
        borderRadius: 23,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: Colors.INPUT_BACKGROUND,
    },
});

export default BrowseScreen;