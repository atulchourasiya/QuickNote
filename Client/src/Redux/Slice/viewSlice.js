import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	listView: true,
	emailFieldOpen: null
};
const viewSlide = createSlice({
	name: 'view',
	initialState,
	reducers: {
		setView(state, action) {
			state.listView = action.payload;
		},
		setEmailFieldOpen(state, action) {
			state.emailFieldOpen = action.payload;
		}
	}
});

export const { setView, setEmailFieldOpen } = viewSlide.actions;
export default viewSlide.reducer;
