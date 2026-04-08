import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    items: { [productId: string]: number };
    barId: string | null;
}

const initialState: CartState = {
    items: {},
    barId: null,
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
        removeItem: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            if (state.items[id] > 1) state.items[id] -= 1;
            else delete state.items[id];
        },
        deleteItemCompletely: (state, action: PayloadAction<{ id: string }>) => {
            delete state.items[action.payload.id];
        },
        clearCart: () => initialState,
    },
});

export const { addItem, removeItem,deleteItemCompletely, clearCart } = cartSlice.actions;
export default cartSlice.reducer;