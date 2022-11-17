import { createSlice } from '@reduxjs/toolkit';

const initialState = function() {
	let newnotebottom = localStorage.getItem('newnotebottom');
	let morning = localStorage.getItem('morning');
	let afternoon = localStorage.getItem('afternoon');
	let evening = localStorage.getItem('evening');
	if (newnotebottom === null) {
		localStorage.setItem('newnotebottom', 'true');
		newnotebottom = true;
	}
	if (morning === null) {
		localStorage.setItem('morning', '06:00');
		morning = '06:00';
	}
	if (afternoon === null) {
		localStorage.setItem('afternoon', '12:00');
		afternoon = '12:00';
	}
	if (evening === null) {
		localStorage.setItem('evening', '17:00');
		evening = '17:00';
	}
	return {
		newnotebottom,
		morning,
		afternoon,
		evening
	}
}();
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

export const { setNewNoteBottom, setMorningTime, setAfternoonTime, setEveningTime } =
	settingSlice.actions;
export default settingSlice.reducer;
