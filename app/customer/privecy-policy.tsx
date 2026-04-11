// customer/privecy-policy.tsx
import PolicyScreen from '@/components/CommonComponents/PolicyScreen';
import { useGetPrivacyPolicyQuery } from '@/redux/services/profile';
export default function CustomerPrivacy() {
    const { data, isLoading } = useGetPrivacyPolicyQuery(undefined);
    return <PolicyScreen title="Privacy Policy" staticTitle="Privacy Policy" data={data} isLoading={isLoading} />;
}