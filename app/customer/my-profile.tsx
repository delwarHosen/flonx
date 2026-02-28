import { EditIcon } from '@/assets/images/icons/ProfileInfoIcons/EditIcon'
import { EmailIcon } from '@/assets/images/icons/ProfileInfoIcons/EmailIcon'
import { ProfileIcon } from '@/assets/images/icons/ProfileInfoIcons/ProfileIcon'
import { ProfileDetailsCard } from '@/components/cardComponents/ProfileDetailsCard'
import { CustomButton } from '@/components/CustomButton'
import ProfileImageComponent from '@/components/ProfileImageComponents'
import SectionTitle from '@/components/SectionTitle'
import { ButtonText } from '@/components/typo/Typography'
import { IMAGE_COMPONENTS } from '@/constants/image.index'
import { Colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MyProfile() {
    const router = useRouter();
    const handleEdit = () => {
        router.push("/customer/edit-profile")
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <SectionTitle
                    title='My Profile'
                />
            </View>
            <View style={{ paddingHorizontal: "5%", marginTop:10 }}>

                <ProfileImageComponent
                    image={IMAGE_COMPONENTS.profileImg}
                />

                <ProfileDetailsCard
                    icon={<ProfileIcon />}
                    label="NAME"
                    value="Roberts Junior "
                />
                <ProfileDetailsCard
                    icon={<EmailIcon />}
                    label="Email"
                    value="robert@canaletto.com  "
                />
                {/* ----Submit Button---- */}
                <CustomButton
                    title=""
                    onPress={handleEdit}
                    width="100%"
                    height={44}
                    borderRadius={100}
                    icon={
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <EditIcon />
                            <ButtonText color={Colors.NEUTRAL0}>Update profile</ButtonText>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
        // paddingHorizontal: "10%",
    }
})