import { NotificationIcon } from '@/assets/images/icons/ProfileInfoIcons/NotificationIcon'
import { ProfileLockIcon } from '@/assets/images/icons/ProfileInfoIcons/ProfileLockIcon'
import { UserDeleteIcon } from '@/assets/images/icons/ProfileInfoIcons/UserDeleteIcon'
import { ProfileCard } from '@/components/cardComponents/ProfileCard'
import SectionTitle from '@/components/SectionTitle'
import { Colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AccountSetting() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.safeareContainer}>
            <View>
                <SectionTitle
                    title='Account Settings'
                />
            </View>
            <View style={{ paddingHorizontal: "5%", marginTop:10 }}>
                <ProfileCard
                    icon={<NotificationIcon />}
                    label="Push Notification"
                    onPress={() => router.push("/customer/push-notification")}
                />

                <ProfileCard
                    icon={<ProfileLockIcon />}
                    label="Change Password"
                    onPress={() => router.push("/customer/change-assword")}
                />

                <ProfileCard
                    icon={<UserDeleteIcon />}
                    label="Delete account "
                    style={{ backgroundColor: "#EF44441A" }}
                    textColor='#EF4444'
                    borderColor="#EF44441A"
                    iconBG="#FFFFFF0D"
                    onPress={() => router.push("/customer/delete-account")}
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