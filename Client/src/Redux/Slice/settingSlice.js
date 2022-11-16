import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	newnotebottom: true,
	morning: '06:00',
	afternoon: '12:00',
	evening: '17:00'
};
const settingSlice = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		setNewNoteBottom(state, action) {
			state.newnotebottom = action.payload;
		},
		setMorningTime(state, action) {
			state.morning = action.payload;
		},
		setAfternoonTime(state, action) {
			state.afternoon = action.payload;
		},
		setEveningTime(state, action) {
			state.evening = action.payload;
		}
	}
});

export const {
	setNewNoteBottom,
	setMorningTime,
	setAfternoonTime,
	setEveningTime,
} = settingSlice.actions;
export default settingSlice.reducer;
