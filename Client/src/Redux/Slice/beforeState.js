import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	beforeState: null
};
const beforeStateSlice = createSlice({
	name: 'beforeState',
	initialState,
	reducers: {
		setBeforeState(state, action) {
			state.beforeState = action.payload;
		}
	}
});

export const { setBeforeState } = beforeStateSlice.actions;
export default beforeStateSlice.reducer;
