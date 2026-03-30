import { NotificationIcon } from '@/assets/images/icons/ProfileInfoIcons/NotificationIcon';
import { Body1, Body3 } from '@/components/typo/Typography';
import { IMAGE_COMPONENTS } from '@/constants/image.index';
import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import GigCard from '@/components/cardComponents/GigCard';
import SearchBar from '@/components/CommonComponents/SearchBar';
// import { getJobs } from '@/constants/data/getJobs';
import FilterModal from '@/components/QRScannerModal/FilterModal';
import { useGetProfileQuery } from '@/redux/services/authApi';
import { useGetAllJobsQuery } from '@/redux/services/jobApi';
import { hp, wp } from '@/utils/responsive';

// ... imports exactly same as yours

const BrowseScreen: React.FC = () => {
    const [query, setQuery] = useState<string>('')

    const router = useRouter();
    const { data: profile } = useGetProfileQuery({});
    const { data: jobsData, isLoading } = useGetAllJobsQuery({
        searchTerm: query
    })

    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string>('');

    const jobs = jobsData?.result || [];





    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" />

            <FlatList
                data={jobs}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={
                    <View style={[styles.headerContainer, { paddingTop: hp(20) }]}>
                        <View style={styles.header}>
                            <View style={styles.userInfo}>
                                <Image source={IMAGE_COMPONENTS.profileImg} style={styles.avatar} />
                                <View style={{ marginLeft: 12 }}>
                                    <Body1 italic color={Colors.NEUTRAL0} weight="bold">Hello {profile?.name || "User"}</Body1>
                                    <Body3 italic style={{ marginTop: hp(8) }} color={Colors.PLACEHOLLDER_TEXT}>Welcome to FLÖNX</Body3>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => router.push("/bartender/profile/notification")}
                                style={styles.notificationBtn}>
                                <NotificationIcon size={24} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: hp(20) }}>
                            <SearchBar
                                placeholder="Search"
                                value={query}
                                onChangeText={setQuery}
                                showFilter={true}
                                onScanPress={() => setFilterVisible(true)}
                            />
                        </View>
                    </View>
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
            />

            {/* filter modal */}
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
    listContent: {
        paddingHorizontal: wp(20),
        paddingBottom: hp(20),
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