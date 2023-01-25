import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLable } from './lableSlice';
import { setInitialLoading, setLoading } from './loadingSlice';
import { fetchAllNotes } from './notesSlice';
import { setLogin } from './viewSlice';

const initialState = {
	user: null
};

export const getUser = createAsyncThunk('user/getUser', async (_, { dispatch }) => {
	dispatch(setLoading(true));
	dispatch(setInitialLoading(true));
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/auth/success`, {
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
			dispatch(fetchAllNotes(json.user.email));
			dispatch(fetchLable(json.user.email));
			dispatch(setLoading(false));
			dispatch(setLogin(false));
			return json.user;
		} else throw new Error('Authentication has been failed!');
	} catch (err) {
		dispatch(setInitialLoading(false));
		dispatch(setLoading(false));
		dispatch(setLogin(true));
		console.error(err);
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
	},
	reducers:{
		setUser(state,action){
			state.user = action.payload;
		}
	}
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
