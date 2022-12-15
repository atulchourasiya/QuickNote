import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	listView: true,
	emailFieldOpen: null,
	login: false,
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
		setLogin(state, action) {
			state.login = action.payload;
		},
		setTitle(state, action) {
			state.title = action.payload;
		}
	}
});

export const { setView, setEmailFieldOpen, setTitle, setLogin } = viewSlide.actions;
export default viewSlide.reducer;
