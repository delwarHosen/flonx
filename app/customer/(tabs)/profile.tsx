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
import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

export default function ProfileScreen() {
  const router = useRouter();
  // console.log(IMAGE_COMPONENTS.profileImg,"gtdrt");
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={{ width: '100%' }}>
        {/* SEctiontitle */}
        <SectionTitle title='Profile' />
        {/* Image components */}
        <ProfileImageComponent
          image={IMAGE_COMPONENTS.profileImg}
          name="Roberts Junior "
        />
        <ProfileCard
          icon={<ProfileIcon size={16} />}
          label="My Profile"
          onPress={() => router.push("/customer/my-profile")}
        />

        <ProfileCard
          icon={<SettingIcon />}
          label="Account Setting"
          onPress={() => router.push("/customer/account-setting")}
        />

        <View style={{ marginTop: 6, marginBottom: 10 }}>
          <Caption2 color={Colors.PLACEHOLLDER_TEXT}>More</Caption2>
        </View>

        <ProfileCard
          icon={<TermAndCondition />}
          label="Terms & Condition"
          onPress={() => router.push("/customer/term-and-condition")}
        />

        <ProfileCard
          icon={<PrivecyPolicyIcon />}
          label="Privacy policy"
          onPress={() => router.push("/customer/privecy-policy")}
        />

        <ProfileCard
          icon={<LegalCompanyInfoIcon />}
          label="Legal & Company Info"
          onPress={() => router.push("/customer/legal-company-info")}
        />

        <ProfileCard
          icon={<HelpSupportIcon />}
          label="Help & Support"
          onPress={() => router.push("/customer/help-support")}
        />

        <ProfileCard
          icon={<LogoutIcon />}
          label="Log Out"
          style={{ backgroundColor: "#EF44441A" }}
          textColor='#EF4444'
          borderColor="#EF44441A"
          iconBG="#FFFFFF0D"
          onPress={() => router.push("/customer/logout")}
        />
        <ProfileCard
          icon={<LogoutIcon />}
          label="Log Out"
          style={{ backgroundColor: "#EF44441A" }}
          textColor='#EF4444'
          borderColor="#EF44441A"
          iconBG="#FFFFFF0D"
          onPress={() => router.push("/customer/logout")}
        />

      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
    backgroundColor: Colors.APP_BACKGROUND,
  }
})