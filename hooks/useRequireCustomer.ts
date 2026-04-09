import { setCredentials } from '@/redux/authSlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useRequireCustomer = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const role = useSelector((state: RootState) => state.auth.userRole);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const verify = async () => {
            
            if (role === 'customer') {
                setChecked(true);
                return;
            }

           
            try {
                const token = await SecureStore.getItemAsync('accessToken');
                if (token) {
                    const decoded: any = jwtDecode(token);
                    if (decoded?.role === 'customer') {
                        dispatch(setCredentials({ role: 'customer', token }));
                        setChecked(true);
                        return;
                    }
                }
            } catch (e) {
                console.log('Token decode error:', e);
            }

          
            router.replace('/(auth)/login' as any);
        };

        verify();
    }, [role]);

    return checked;
};