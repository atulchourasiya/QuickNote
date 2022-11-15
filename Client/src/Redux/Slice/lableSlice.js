import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from './loadingSlice';
import { setAlert } from './alertSlice';

const initialState = {
	lable: []
};

export const fetchLable = createAsyncThunk('notes/fetchLable', async (user, { dispatch }) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(
			process.env.NODE_ENV === 'production'
				? `${process.env.REACT_APP_HOST}/note/fetchLable`
				: 'http://localhost:5000/note/fetchLable',
			{
				method: 'POST',
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({ user: user })
			}
		);
		if (response.status === 200) {
			const json = await response.json();
			dispatch(setLoading(false));
			return json;
		} else throw new Error('Something went wrong!');
	} catch (err) {
		console.error(err);
		dispatch(setLoading(false));
		return [];
	}
});
export const addLable = createAsyncThunk('notes/addLable', async (lable, { dispatch }) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(
			process.env.NODE_ENV === 'production'
				? `${process.env.REACT_APP_HOST}/note/addLable`
				: 'http://localhost:5000/note/addLable',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(lable)
			}
		);
		if (response.status === 200) {
			const res = await response.json();
			console.log(res)
			dispatch(setAlert('Lable Is Added Successfully!✅'));
			dispatch(fetchLable(lable.user));
			dispatch(setLoading(false));
			return res;
		}
	} catch (error) {
		console.error(error);
		dispatch(setAlert('Something Went Wrong!❌'));
		dispatch(setLoading(false));
	}
});

const lableSlice = createSlice({
	name: 'lable',
	initialState,
	extraReducers: {
		[fetchLable.fulfilled]: (state, action) => {
			state.lable = action.payload;
		},
		[fetchLable.rejected]: (state) => {
			state.lable = [];
		}
	}
});
export default lableSlice.reducer;
