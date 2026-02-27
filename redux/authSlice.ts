import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    userRole: 'customer' | 'bartender' | null;
}

const initialState: AuthState = {
    userRole: null,
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // This action will be called in SelectRole screen
        setRole: (state, action: PayloadAction<'customer' | 'bartender' | null>) => {
            state.userRole = action.payload;
        },
        // Clear state on logout
        logout: (state) => {
            state.userRole = null;
        },
    },
});


export const { setRole, logout } = authSlice.actions;
export default authSlice.reducer;