import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';

interface AuthState {
    userRole: 'customer' | 'bartender' | null;
    token: string | null;
};

const initialState: AuthState = {
    userRole: null,
    token: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ role: 'customer' | 'bartender'; token: string }>
        ) => {
            state.userRole = action.payload.role;
            state.token = action.payload.token;
        },
        setRole: (state, action: PayloadAction<'customer' | 'bartender' | null>) => {
            state.userRole = action.payload;
        },
        logout: (state) => {
            state.userRole = null;
            state.token = null;
            SecureStore.deleteItemAsync('accessToken');
        },
    },
});

export const { setCredentials, setRole, logout } = authSlice.actions;
export default authSlice.reducer;