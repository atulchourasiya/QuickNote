import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	listView: true
};
const viewSlide = createSlice({
	name: 'view',
	initialState,
	reducers: {
		setView(state, action) {
			state.listView = action.payload;
		}
	}
});

export const { setView } = viewSlide.actions;
export default viewSlide.reducer;
