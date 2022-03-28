import { createSlice } from "@reduxjs/toolkit";
const defaultUIState = {
	cartVisibility: false,
	notification: null,
	fetching: false,
	sending: false,
	error: null,
};
const uiSlice = createSlice({
	name: "ui",
	initialState: defaultUIState,
	reducers: {
		toggle(state, _) {
			state.cartVisibility = !state.cartVisibility;
		},
		setNotification(state, action) {
			const data = action.payload;
			state.notification = data;
		},
		toggleFetching(state, _) {
			state.fetching = !state.fetching;
		},
		toggleSending(state, _) {
			state.sending = !state.sending;
		},
		setError(state, action) {
			const error = action.payload;
			state.error = error;
		},
	},
});
export const UIActions = uiSlice.actions;
export default uiSlice.reducer;
