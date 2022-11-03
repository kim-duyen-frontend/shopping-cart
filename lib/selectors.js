import { createSelector } from "@reduxjs/toolkit";

const cartItemsSelector = state => state.cart.cartItems;

export const cartTotalSelector = createSelector(cartItemsSelector,
    (cartItems) => cartItems.reduce((sum, value) => sum + value.product.price * value.quantity, 0)
)
