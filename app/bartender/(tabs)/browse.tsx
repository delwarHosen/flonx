import { Body1, Body3 } from '@/components/typo/Typography';
import { IMAGE_COMPONENTS } from '@/constants/image.index';
import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import { RefreshControl } from 'react-native';

const BrowseScreen: React.FC = () => {
    const [query, setQuery] = useState<string>('')
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string>('');
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [refreshing, setRefreshing] = useState(false);


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

    const router = useRouter();
    const { data: profile } = useGetProfileQuery({});

    const { data: jobsData, isLoading: jobsLoading, isFetching: jobsFetching, refetch, error: jobsError, } = useGetAllJobsQuery({
        searchTerm: query,
        lat: coords?.lat,
        lng: coords?.lng,
    }, {
        refetchOnMountOrArgChange: true,
    });


    const onRefresh = useCallback(async () => {

        if (coords) {
            setRefreshing(true);
            try {
                await refetch();
            } catch (error) {
                console.error("Refetch failed:", error);
            } finally {
                setRefreshing(false);
            }
        } else {

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                setCoords({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                });
            }
        }
    }, [refetch, coords]);

    const { data: applications = [],
        isLoading: appsLoading,
        isFetching: appsFetching,
        error: appsError
    } = useGetMyApplicationsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const isLoading = jobsLoading || appsLoading || jobsFetching || appsFetching;

    const appliedJobIds = new Set(
        applications
            .filter((app: any) => app.job)
            .map((app: any) => app.job._id)
    );

    const jobs = (jobsData?.result || []).filter((job: any) => {
        const isOpen = job.status === 'Open';
        const notApplied = !appliedJobIds.has(job._id);

        const matchesSearch = query === '' ||
            job.title?.toLowerCase().includes(query.toLowerCase()) ||
            job.address?.toLowerCase().includes(query.toLowerCase());
        return isOpen && notApplied && matchesSearch;
    });



    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" />

            {isLoading && !refreshing && (
                <View style={styles.loaderOverlay}>
                    <CustomLoader size={40}/>
                </View>
            )}

            {/*  Sticky header */}
            <View style={styles.stickyHeader}>
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <TouchableOpacity onPress={() => router.push("/bartender/profile")}>
                            <Image
                                source={profile?.profile_image ? { uri: profile.profile_image } : IMAGE_COMPONENTS.profileImg}
                                style={styles.avatar}
                            />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 12 }}>
                            <Body1 italic color={Colors.NEUTRAL0} weight="bold">Hello {profile?.name || "User"}</Body1>
                            <Body3 italic style={{ marginTop: hp(8) }} color={Colors.PLACEHOLLDER_TEXT}>Welcome to FLÖNX</Body3>
                        </View>
                    </View>
                    {/* <TouchableOpacity
                        onPress={() => router.push("/bartender/profile/notification")}
                        style={styles.notificationBtn}>
                        <NotificationIcon size={24} />
                    </TouchableOpacity> */}
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

            <FlatList
                data={isLoading ? [] : jobs}
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
                ListEmptyComponent={
                    !isLoading ? (
                        <EmptyStateCard message="No jobs available at the moment" />
                    ) : null
                }
            />

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
    headerContainer: {
        marginBottom: hp(10),
    },
    stickyHeader: {
        paddingHorizontal: wp(20),
        paddingTop: hp(20),
        paddingBottom: hp(12),
        backgroundColor: Colors.APP_BACKGROUND,
    },
    listContent: {
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
        backgroundColor: Colors.INPUT_BACKGROUND
    },
    notificationBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BrowseScreen;