import { createSlice } from '@reduxjs/toolkit';
const initialState = function () {
	let theme = localStorage.getItem('currentTheme');
	if (theme === null) {
		localStorage.setItem('currentTheme', 'dark');
		theme = 'dark';
	}
	return {
		theme
	}
}();
const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme(state, action) {
			state.theme = action.payload;
			document.body.classList = '';
			document.body.classList = state.theme;
		}
	}
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
