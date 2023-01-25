import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setInitialLoading, setLoading } from './loadingSlice';
import { setAlert } from './alertSlice';
import { updateManyNote } from './notesSlice';
import { setUser } from './userSlice';
import { setLogin } from './viewSlice';

const initialState = {
	lable: []
};

export const fetchLable = createAsyncThunk('notes/fetchLable', async (user, { dispatch }) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/note/fetchLable`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ user: user })
		});
		if (response.status === 200) {
			const json = await response.json();
			dispatch(setLoading(false));
			dispatch(setInitialLoading(false));
			return json;
		} else if (response.status === 401) {
			dispatch(setUser(null));
			alert('Login session is over, you have to login again!❌');
			dispatch(setLogin(true));
		} else throw new Error('Something went wrong!');
	} catch (err) {
		console.error(err);
		dispatch(setInitialLoading(false));
		dispatch(setLoading(false));
		return [];
	}
});
export const addLable = createAsyncThunk('notes/addLable', async (lable, { dispatch }) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/note/addLable`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(lable)
		});
		if (response.status === 200) {
			const res = await response.json();
			dispatch(setAlert('Lable Is Added Successfully!✅'));
			dispatch(fetchLable(lable.user));
			dispatch(setLoading(false));
			return res;
		} else if (response.status === 401) {
			dispatch(setUser(null));
			alert('Login session is over, you have to login again!❌');
			dispatch(setLogin(true));
		} else throw new Error('Something went wrong!');
	} catch (error) {
		console.error(error);
		dispatch(setAlert('Something Went Wrong!❌'));
		dispatch(setLoading(false));
	}
});
export const deleteLable = createAsyncThunk('notes/deleteLable', async (lable, { dispatch }) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/note/addLable`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user: lable.user,
				lable: lable.lable
			})
		});
		if (response.status === 200) {
			const res = await response.json();
			dispatch(setAlert('Lable Is Deleted Successfully!✅'));
			dispatch(fetchLable(lable.user));
			let UpdateArray = [];
			lable.notes.forEach((note) => {
				let tag = note.tag.filter((item) => {
					return item !== lable.lableDelete;
				});
				UpdateArray.push({
					_id: note._id,
					tag
				});
			});
			dispatch(
				updateManyNote({
					obj: {
						notes: UpdateArray
					},
					email: lable.user
				})
			);
			dispatch(setLoading(false));
			return res;
		} else if (response.status === 401) {
			dispatch(setUser(null));
			alert('Login session is over, you have to login again!❌');
			dispatch(setLogin(true));
		} else throw new Error('Something went wrong!');
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
