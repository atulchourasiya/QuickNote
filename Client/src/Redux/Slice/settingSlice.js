import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	newnotebottom: true,
	tickednotebottom: true
};
const settingSlice = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		setNewNoteBottom(state, action) {
			state.newnotebottom = action.payload;
		},
		setTickedNoteBottom(state, action) {
			state.tickednotebottom = action.payload;
		}
	}
});

export const { setNewNoteBottom, setTickedNoteBottom } = settingSlice.actions;
export default settingSlice.reducer;
