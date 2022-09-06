import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	theme: 'dark'
};
const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme(state,action) {
			state.theme = action.payload;
			document.body.classList ='';
			document.body.classList = state.theme;
		}
	}
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
