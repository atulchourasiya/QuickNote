import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from './loadingSlice';

const initialState = {
	user: null
};

export const getUser = createAsyncThunk('user/getUser', async (_, { dispatch }) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch('http://localhost:5000/auth/success', {
			method: 'POST',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true
			}
		});
		if (response.status === 200) {
			const json = await response.json();
			dispatch(setLoading(false));
			return json;
		} else throw new Error('Authentication has been failed!');
	} catch (err) {
		console.error(err);
		dispatch(setLoading(false));
		// window.open('http://localhost:5000/auth/google','_self');
		return { user: null };
	}
});
const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: {
		[getUser.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
		},
		[getUser.rejected]: (state) => {
			state.user = { user: null };
		}
	}
});

export default userSlice.reducer;
