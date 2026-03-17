import { NotificationIcon } from '@/assets/images/icons/ProfileInfoIcons/NotificationIcon'
import { ProfileLockIcon } from '@/assets/images/icons/ProfileInfoIcons/ProfileLockIcon'
import { UserDeleteIcon } from '@/assets/images/icons/ProfileInfoIcons/UserDeleteIcon'
import { ProfileCard } from '@/components/cardComponents/ProfileCard'
import SectionTitle from '@/components/SectionTitle'
import { Colors } from '@/constants/theme'
import { RootState } from '@/redux/store'
import { hp, wp } from '@/utils/responsive'
import { Href, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

export default function AccountSettingView() {
    const router = useRouter();
    const userRole = useSelector((state: RootState) => state.auth.userRole);

    /**
     * Dynamic path return
     */
    const getPath = (screenName: string): Href => {
        if (userRole === 'bartender') {
            return `/bartender/profile/${screenName}` as Href;
        }
        return `/customer/${screenName}` as Href;
    };

    return (
        <SafeAreaView style={styles.safeareContainer}>
            <View style={{ paddingTop: "4%" }}>
                <SectionTitle title='Account Settings' />
            </View>
            <View style={{ paddingHorizontal: wp(20), marginTop: hp(20) }}>
                
                <ProfileCard
                    icon={<NotificationIcon size={16} />}
                    label="Push Notification"
                    onPress={() => router.push(getPath('push-notification'))}
                />

                <ProfileCard
                    icon={<ProfileLockIcon />}
                    label="Change Password"
                    onPress={() => router.push(getPath('change-assword'))}
                />

                <ProfileCard
                    icon={<UserDeleteIcon />}
                    label="Delete account"
                    style={{ backgroundColor: "#EF44441A" }}
                    textColor='#EF4444'
                    borderColor="#EF44441A"
                    iconBG="#FFFFFF0D"
                    onPress={() => router.push(getPath('delete-account'))}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeareContainer: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND
    }
})