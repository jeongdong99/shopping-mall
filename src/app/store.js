import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '../features/basket/basketSlice';
import isLoggedReducer from '../features/basket/isLoggedSlice';
import isModalOpenReducer from '../features/basket/isModalOpenSlice';

export const store = configureStore({
	reducer: {
		basket: basketReducer,
		isLogged: isLoggedReducer,
		isModalOpen: isModalOpenReducer,
	},
});
