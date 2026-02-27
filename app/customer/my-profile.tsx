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
import { KeyboardAvoidingView, Platform, View } from 'react-native'

export default function MyProfile() {
    const router= useRouter();
    const handleEdit = () => {
        router.push("/customer/edit-profile")
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: Colors.APP_BACKGROUND, paddingHorizontal: "5%", marginTop: 12 }}
        >
            <View>
                <SectionTitle
                    title='My Profile'
                />
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
        </KeyboardAvoidingView>
    )
}