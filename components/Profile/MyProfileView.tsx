import { StarIcon } from '@/assets/images/icons/BarRelatedIcon/StarIcon'
import { EditIcon } from '@/assets/images/icons/ProfileInfoIcons/EditIcon'
import { EmailIcon } from '@/assets/images/icons/ProfileInfoIcons/EmailIcon'
import { ProfileIcon } from '@/assets/images/icons/ProfileInfoIcons/ProfileIcon'
import { ProfileDetailsCard } from '@/components/cardComponents/ProfileDetailsCard'
import { CustomButton } from '@/components/CustomButton'
import ProfileImageComponent from '@/components/ProfileImageComponents'
import SectionTitle from '@/components/SectionTitle'
import { ButtonText } from '@/components/typo/Typography'
import { FORM_FIELDS } from '@/constants/form'
import { IMAGE_COMPONENTS } from '@/constants/image.index'
import { Colors } from '@/constants/theme'
import { RootState } from '@/redux/store'
import { hp, wp } from '@/utils/responsive'
import { Href, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

export default function MyProfileView() {
    const router = useRouter();
    const userRole = useSelector((state: RootState) => state.auth.userRole);
    const isBartander = userRole === "bartender";

       const handleEdit = () => {
        const path: Href = userRole === 'bartender'
            ? {
                pathname: "/bartender/profile/edit-profile",
                params: {
                    [FORM_FIELDS.FULL_NAME]: "Roberts Junior",
                    [FORM_FIELDS.CONTACT_NO]: "+1 (212) 555-0148",
                    [FORM_FIELDS.EXPERIENCE]: "2 Years"
                }
            }
            : {
                pathname: "/customer/edit-profile",
                params: {
                    [FORM_FIELDS.FULL_NAME]: "Roberts Junior"
                }
            };

        router.push(path);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: hp(20) }}>
                <SectionTitle title='My Profile' />
            </View>
            <View style={{ paddingHorizontal: wp(20), marginTop: hp(10) }}>
                <ProfileImageComponent image={IMAGE_COMPONENTS.profileImg} />

                {
                    isBartander ?
                        (
                            <>
                                <ProfileDetailsCard
                                    // icon={<ProfileIcon />}
                                    label="NAME"
                                    value="Roberts Junior"
                                />
                                <ProfileDetailsCard
                                    label="Email"
                                    value="robert@canaletto.com"
                                />
                                <ProfileDetailsCard
                                    label="Contact phone "
                                    value="+1 (212) 555-0148"
                                />
                                <ProfileDetailsCard
                                    label="Experience "
                                    value="2 Years "
                                />
                                <ProfileDetailsCard
                                    label="Total Jobs Completed "
                                    value="256 "
                                />
                                <ProfileDetailsCard
                                    label="Overall rating"
                                    valueIcon={<StarIcon color='#FFB020' />}
                                    value="4.4 (112)"
                                />
                            </>
                        )
                        :
                        (
                            <>
                                <ProfileDetailsCard
                                    icon={<ProfileIcon />}
                                    label="NAME"
                                    value="Roberts Junior"
                                />
                                <ProfileDetailsCard
                                    icon={<EmailIcon />}
                                    label="Email"
                                    value="robert@canaletto.com"
                                />
                            </>
                        )
                }



                <CustomButton
                    title=""
                    onPress={handleEdit}
                    width="100%"
                    height={hp(44)}
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
    }
})