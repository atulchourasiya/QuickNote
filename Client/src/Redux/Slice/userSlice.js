import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLable } from './lableSlice';
import { setLoading } from './loadingSlice';
import { fetchAllNotes } from './notesSlice';

const initialState = {
	user: null
};

export const getUser = createAsyncThunk('user/getUser', async (_, { dispatch }) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(
			process.env.NODE_ENV === 'production'
				? `${process.env.REACT_APP_HOST}/auth/success`
				: 'http://localhost:5000/auth/success',
			{
				method: 'POST',
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true
				}
			}
		);
		if (response.status === 200) {
			const json = await response.json();
			dispatch(fetchAllNotes(json.user.email));
			dispatch(fetchLable(json.user.email));
			dispatch(setLoading(false));
			return json.user;
		} else throw new Error('Authentication has been failed!');
	} catch (err) {
		console.error(err);
		dispatch(setLoading(false));
		window.open(
			process.env.NODE_ENV === 'production'
				? `${process.env.REACT_APP_HOST}/auth/google`
				: 'http://localhost:5000/auth/google',
			'_self'
		);
		return null;
	}
});
const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: {
		[getUser.fulfilled]: (state, action) => {
			state.user = action.payload;
		},
		[getUser.rejected]: (state) => {
			state.user = null;
		}
	}
});

export default userSlice.reducer;
