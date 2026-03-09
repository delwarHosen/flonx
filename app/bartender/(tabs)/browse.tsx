import { NotificationIcon } from '@/assets/images/icons/ProfileInfoIcons/NotificationIcon';
import QRScannerModal from '@/components/QRScannerModal/QRScannerModal';
import { Body1, Body3 } from '@/components/typo/Typography';
import { IMAGE_COMPONENTS } from '@/constants/image.index';
import { Colors } from '@/constants/theme';
import { useCameraScanner } from '@/hooks/useCameraScanner';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import GigCard from '@/components/cardComponents/GigCard';
import SearchBar from '@/components/CommonComponents/SearchBar';
import { getJobs } from '@/constants/data/getJobs';

// ... imports exactly same as yours

const BrowseScreen: React.FC = () => {
    const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('')
    const { checkPermission } = useCameraScanner();
    const router = useRouter();

    const openJobs = getJobs.filter(job => job.status === "Open");

    const handleOpenScanner = async () => {
        const isAllowed = await checkPermission();
        if (isAllowed) {
            setIsScannerOpen(true);
        }
    };

    const onScanSuccess = (qrData: string) => {
        setIsScannerOpen(false);
        Alert.alert("Success", `Venue QR Scanned: ${qrData}`);
    };

    // Header content exactly the same
    const renderHeaderContent = () => (
        <View style={[styles.headerContainer, { paddingHorizontal: 20 }]}>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image
                        source={IMAGE_COMPONENTS.profileImg}
                        style={styles.avatar}
                    />
                    <View style={{ marginLeft: 12 }}>
                        <Body1 italic color={Colors.NEUTRAL0} weight="bold">Hello Florian</Body1>
                        <Body3 italic style={{ marginTop: 6 }} color={Colors.PLACEHOLLDER_TEXT}>Welcome to FLÖNX</Body3>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => router.push("/bartender/profile/notification")}
                    style={styles.notificationBtn}>
                    <NotificationIcon size={24} />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
                <SearchBar
                    placeholder="Search"
                    value={query}
                    onChangeText={setQuery}
                    onScanPress={handleOpenScanner} // Scanner trigger link kora hoyeche
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" />

            <QRScannerModal
                isVisible={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={onScanSuccess}
            />

            {/* Header fixed thakbe tai FlatList er baire ana hoyeche */}
            {renderHeaderContent()}

            <FlatList
                data={openJobs}
                keyExtractor={(item) => item.id}
                // ListHeaderComponent khati rakha hoyeche jate top e ektu gap thake
                ListHeaderComponent={<View style={{ height: 10 }} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <GigCard
                        item={item}
                        onPress={() => {
                            router.push({
                                pathname: '/bartender/jobs/browse-details',
                                params: { id: item.id, initialTab: 'open' },
                            });
                        }}
                    />
                )}
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
        marginBottom: 10,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
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