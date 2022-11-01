import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	sharedEmail: null,
	isUpdate: false
};
const sharedEmail = createSlice({
	name: 'sharedEmail',
	initialState,
	reducers: {
		setSharedEmail(state, action) {
			state.sharedEmail = action.payload;
		},
		setIsUpdate(state, action) {
			state.isUpdate = action.payload;
		}
	}
});

export const { setSharedEmail, setIsUpdate } = sharedEmail.actions;
export default sharedEmail.reducer;
