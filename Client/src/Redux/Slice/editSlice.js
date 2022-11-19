import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	note: null
};
const editSlice = createSlice({
	name: 'editState',
	initialState,
	reducers: {
		setEditState(state, action) {
			state.note = action.payload;
		}
	}
});

export const { setEditState } = editSlice.actions;
export default editSlice.reducer;
