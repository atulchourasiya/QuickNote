import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	loading: false,
	intialLoading: false
};
const loadingSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setInitialLoading(state,action){
			state.intialLoading = action.payload;
		}
	}
});

export const { setLoading ,setInitialLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
