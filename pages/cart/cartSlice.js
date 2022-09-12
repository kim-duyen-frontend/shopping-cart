import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const index = state.cartItems.findIndex((item) => item.id == newItem.id);
            if (index >= 0) {
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            const index = state.cartItems.findIndex((item) => item.id == id);
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
        },

        removeFromCart(state, action) {
            const newItem = action.payload;
            const nextCartItems = state.cartItems.filter((item) => item.id !== newItem.id);
            state.cartItems = nextCartItems;
        }
    }
})
export const { addToCart, setQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;