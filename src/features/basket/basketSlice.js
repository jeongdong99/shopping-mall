import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const basketSlice = createSlice({
	name: 'basket',
	initialState,
	// Prb8: when newly dispatching the basketAdd action, the original one disappear. =>
	// Sol1: Check the redux tutorial docs. Is it same situation?
	// -> Yes. In the tree chart of the redux devtools, after create new thing(post here),
	// Sol2: Directly check the basket state of store. Check the way of look indide of the store data(useSelector)
	// Result: Before reloading, in the store there is an state array as I expected. But after reload the page, it initialized
	//Prb12: basketCount needs to count the number of unique value of product
	//Sol: Add conditional statement. If the unique item already exist in the store, then just return current state.
	// if not, then pust new item in the basket state of the store

	//!Study check how to use the spread operator, findIndex
	reducers: {
		basketAdd(state, action) {
			if (state.map((item) => item.id).includes(action.payload.id)) {
				return state;
			} else {
				state.push({ ...action.payload, count: 1 });
			}
		},
		/* Prb15: Redux reducer function should be pure function, meaning that they should not modify the existing state(immutability)
			if you write code like this: state = state...(assigning other value to store state), then coule encounter unexpected erro
			Sol: just return the filtered state. Then that's become the newly created state*/
		basketDelete(state, action) {
			return state.filter((item) => item.id !== action.payload.id);
		},
		countUp(state, action) {
			const index = state.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1) {
				return [
					...state.slice(0, index),
					{ ...state[index], count: state[index].count + 1 },
					...state.slice(index + 1),
				];
			}
			return state;
		},
		countDown(state, action) {
			const index = state.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1 && state[index].count > 1) {
				return [
					...state.slice(0, index),
					{ ...state[index], count: state[index].count - 1 },
					...state.slice(index + 1),
				];
			}
			return state;
		},
		emptyBasket(state, action) {
			return [];
		},
	},
});

export const { basketAdd, basketDelete, countUp, countDown, emptyBasket } =
	basketSlice.actions;
export default basketSlice.reducer;
