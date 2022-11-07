import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	listView: true,
	emailFieldOpen: null,
	title: 'Quick Note'
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
		},
		setTitle(state, action) {
			state.title = action.payload;
		}
	}
});

export const { setView, setEmailFieldOpen, setTitle } = viewSlide.actions;
export default viewSlide.reducer;
