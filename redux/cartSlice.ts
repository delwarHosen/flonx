import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    items: { [productId: string]: number };
    barId: string | null;
    role: 'guest' | 'customer' | 'bartender' | null;
}

const initialState: CartState = {
    items: {},
    barId: null,
    role: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<{ id: string; barId?: string }>) => {
            const { id, barId } = action.payload;
            if (barId) state.barId = barId;
            state.items[id] = (state.items[id] || 0) + 1;
        },
        setItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number; barId?: string }>) => {
            const { id, quantity, barId } = action.payload;

            if (quantity <= 0) {
                delete state.items[id];
            } else {
                state.items[id] = quantity;
            }

            // Always update barId if explicitly passed — handles both add and rollback
            if (barId !== undefined) {
                state.barId = barId;
            }

            // If cart is now empty, reset barId
            if (Object.keys(state.items).length === 0) {
                state.barId = null;
            }
        },
        removeItem: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            if (state.items[id] > 1) {
                state.items[id] -= 1;
            } else {
                delete state.items[id];
            }
            if (Object.keys(state.items).length === 0) {
                state.barId = null;
            }
        },
        deleteItemCompletely: (state, action: PayloadAction<{ id: string }>) => {
            delete state.items[action.payload.id];
            if (Object.keys(state.items).length === 0) {
                state.barId = null;
            }
        },
        clearCart: () => initialState,

        setCartRole: (state, action: PayloadAction<'guest' | 'customer' | 'bartender' | null>) => {
            if (state.role !== action.payload) {
                state.items = {};
                state.barId = null;
            }
            state.role = action.payload;
        },
    },
});

export const {
    addItem,
    setItemQuantity,
    removeItem,
    deleteItemCompletely,
    clearCart,
    setCartRole,
} = cartSlice.actions;

export default cartSlice.reducer;