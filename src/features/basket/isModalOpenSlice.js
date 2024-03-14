import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const isModalOpenSlice = createSlice({
	name: 'isLogged',
	initialState,
	reducers: {
		setOpen(state) {
			return true;
		},
		setClose(state) {
			return false;
		},
	},
});

export default isModalOpenSlice.reducer;
export const { setOpen, setClose } = isModalOpenSlice.actions;
