import { createSlice } from "@reduxjs/toolkit";
const defaultCartState = { Items: [], totalItems: 0, totalAmount: 0 };
const cartSlice = createSlice({
	name: "cart",
	initialState: defaultCartState,
	reducers: {
		replaceCart(state, action) {
			const items = action.payload.Items;
			const totalAmount = action.payload.totalAmount;
			const totalItems = action.payload.totalItems;
			state.Items = items;
			state.totalAmount = totalAmount;
			state.totalItems = totalItems;
		},
		addToCart(state, action) {
			const newItem = action.payload;
			state.totalItems++;
			state.totalAmount += newItem.price;
			let exisitingIndex = state.Items.findIndex(
				(item) => item.id === newItem.id
			);
			if (exisitingIndex !== -1) {
				state.Items[exisitingIndex].amount++;
			} else {
				state.Items.push(newItem);
			}
		},
		removeFromCart(state, action) {
			const itemID = action.payload;
			state.totalItems--;
			const indexOfItem = state.Items.findIndex(
				(item) => item.id === itemID
			);
			state.totalAmount -= state.Items[indexOfItem].price;
			if (state.Items[indexOfItem].amount > 1) {
				state.Items[indexOfItem].amount--;
			} else {
				state.Items = state.Items.filter((item) => item.id !== itemID);
			}
		},
	},
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
