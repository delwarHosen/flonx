import { HelpSupportIcon } from '@/assets/images/icons/ProfileInfoIcons/HelpSupportIcon'
import { LegalCompanyInfoIcon } from '@/assets/images/icons/ProfileInfoIcons/LegalCompanyInfoIcon'
import { LogoutIcon } from '@/assets/images/icons/ProfileInfoIcons/LogOutIcon'
import { PrivecyPolicyIcon } from '@/assets/images/icons/ProfileInfoIcons/PrivecyPolicyIcon'
import { ProfileIcon } from '@/assets/images/icons/ProfileInfoIcons/ProfileIcon'
import { SettingIcon } from '@/assets/images/icons/ProfileInfoIcons/SettingIcon'
import { TermAndCondition } from '@/assets/images/icons/ProfileInfoIcons/TermAndCondition'
import { ProfileCard } from '@/components/cardComponents/ProfileCard'
import ProfileImageComponent from '@/components/ProfileImageComponents'
import SectionTitle from '@/components/SectionTitle'
import { Caption2 } from '@/components/typo/Typography'
import { IMAGE_COMPONENTS } from '@/constants/image.index'
import { Colors } from '@/constants/theme'
import { RootState } from '@/redux/store'
import { Href, useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

export default function ProfileScreen() {
  const router = useRouter();
  const userRole = useSelector((state: RootState) => state.auth.userRole);


  const getPath = (screenName: string): Href => {
    if (userRole === 'bartender') {
      return `/bartender/profile/${screenName}` as Href;
    }
    return `/customer/${screenName}` as Href;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={{ marginTop: 20 }}>
        <SectionTitle title='Profile' />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={{ width: '100%', paddingHorizontal: "5%", marginTop: 20 }}>

          <ProfileImageComponent
            image={IMAGE_COMPONENTS.profileImg}
            name="Roberts Junior"
          />

          <ProfileCard
            icon={<ProfileIcon size={16} />}
            label="My Profile"
            onPress={() => router.push(getPath('my-profile'))}
          />

          <ProfileCard
            icon={<SettingIcon />}
            label="Account Setting"
            onPress={() => router.push(getPath('account-setting'))}
          />

          <View style={{ marginTop: 6, marginBottom: 10 }}>
            <Caption2 color={Colors.PLACEHOLLDER_TEXT}>More</Caption2>
          </View>

          <ProfileCard
            icon={<TermAndCondition />}
            label="Terms & Condition"
            onPress={() => router.push(getPath('term-and-condition'))}
          />

          <ProfileCard
            icon={<PrivecyPolicyIcon />}
            label="Privacy policy"
            onPress={() => router.push(getPath('privecy-policy'))}
          />

          <ProfileCard
            icon={<LegalCompanyInfoIcon />}
            label="Legal & Company Info"
            onPress={() => router.push(getPath('legal-company-info'))}
          />

          <ProfileCard
            icon={<HelpSupportIcon />}
            label="Help & Support"
            onPress={() => router.push(getPath('help-support'))}
          />

          <ProfileCard
            icon={<LogoutIcon />}
            label="Log Out"
            style={{ backgroundColor: "#EF44441A" }}
            textColor='#EF4444'
            borderColor="#EF44441A"
            iconBG="#FFFFFF0D"
            onPress={() => router.push(getPath('logout'))}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 20
  }
})