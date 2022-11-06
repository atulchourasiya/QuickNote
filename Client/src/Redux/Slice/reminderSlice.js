import { createSlice } from '@reduxjs/toolkit';
import { setIsUpdate } from './sharedEmail';
const initialState = {
	time: null,
	date: null,
	isUpdate: false
};
const reminderSlice = createSlice({
	name: 'reminder',
	initialState,
	reducers: {
		setTime(state, action) {
			state.time = action.payload;
		},
		setDate(state, action) {
			state.date = action.payload;
		},
		setIsUpdate(state, action) {
			state.isUpdate = action.payload;
		}
	}
});

export const { setReminder } = reminderSlice.actions;
export default reminderSlice.reducer;
