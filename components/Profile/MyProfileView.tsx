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
import { useGetBartenderByIdQuery, useGetProfileQuery } from '@/redux/services/authApi'
import { RootState } from '@/redux/store'
import { hp, wp } from '@/utils/responsive'
import { Href, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import CustomLoader from '../CustomLoader'

export default function MyProfileView() {
    const router = useRouter();
    const userRole = useSelector((state: RootState) => state.auth.userRole);
    const isBartander = userRole === "bartender";
    const { data: profile, isLoading } = useGetProfileQuery(undefined);
    const { data: bartenderDetail } = useGetBartenderByIdQuery(profile?._id, {
        skip: !isBartander || !profile?._id,
    });


    const handleEdit = () => {
        const path: Href = userRole === 'bartender'
            ? {
                pathname: "/bartender/profile/edit-profile",
                params: {
                    [FORM_FIELDS.FULL_NAME]: profile?.name ?? '',
                    [FORM_FIELDS.CONTACT_NO]: profile?.phone ?? '',
                    [FORM_FIELDS.EXPERIENCE]: profile?.experience ?? '',
                }
            }
            : {
                pathname: "/customer/edit-profile",
                params: {
                    [FORM_FIELDS.FULL_NAME]: profile?.name ?? '',
                }
            };

        router.push(path);
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <CustomLoader size={40} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: hp(20) }}>
                <SectionTitle title='My Profile' />
            </View>
            <View style={{ paddingHorizontal: wp(20), marginTop: hp(10) }}>

                {/*  dynamic image & name */}
                <ProfileImageComponent
                    image={
                        profile?.profile_image?.trim()
                            ? { uri: profile.profile_image }
                            : IMAGE_COMPONENTS.profileImg
                    }
                />

                {isBartander ? (
                    <>
                        <ProfileDetailsCard label="NAME" value={profile?.name ?? '—'} />
                        <ProfileDetailsCard label="Email" value={profile?.email ?? '—'} />
                        <ProfileDetailsCard label="Contact phone" value={profile?.phone ?? '—'} />
                        <ProfileDetailsCard label="Experience" value={profile?.experience ?? '—'} />
                        <ProfileDetailsCard label="Total Jobs Completed" value={bartenderDetail?.totalCompletedJob ?? '—'} />
                        <ProfileDetailsCard
                            label="Overall rating"
                            valueIcon={<StarIcon color='#FFB020' />}
                            value={bartenderDetail?.averageRating ? `${bartenderDetail.averageRating} (${bartenderDetail.totalRatings})` : '—'}
                        />
                    </>
                ) : (
                    <>
                        <ProfileDetailsCard icon={<ProfileIcon />} label="NAME" value={profile?.name ?? '—'} />
                        <ProfileDetailsCard icon={<EmailIcon />} label="Email" value={profile?.email ?? '—'} />
                    </>
                )}

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