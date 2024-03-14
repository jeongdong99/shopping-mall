import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const isLoggedSlice = createSlice({
	name: 'isLogged',
	initialState,
	reducers: {
		logIn(state) {
			return true;
		},
		logOut(state) {
			return false;
		},
	},
});

export default isLoggedSlice.reducer;
export const { logIn, logOut } = isLoggedSlice.actions;
