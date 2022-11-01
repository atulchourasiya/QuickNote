import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from './loadingSlice';
import { setAlert } from './alertSlice';

const initialState = {
	notes: null
};

export const fetchAllNotes = createAsyncThunk('notes/fetchAllNotes', async (user, { dispatch }) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/note/fetchAllNotes`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ email: user })
		});
		if (response.status === 200) {
			const json = await response.json();
			dispatch(setLoading(false));
			return json;
		} else throw new Error('Something went wrong!');
	} catch (err) {
		console.error(err);
		dispatch(setLoading(false));
		return null;
	}
});
export const addANote = createAsyncThunk('notes/addNote', async (note, { dispatch }) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/note/addNote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note)
		});
		if (response.status === 200) {
			const res = await response.json();
			dispatch(setAlert('Note Is Added Successfully!✅'));
			dispatch(fetchAllNotes(note.email[0]));
			dispatch(setLoading(false));
			return res;
		}
	} catch (error) {
		console.error(error);
		dispatch(setAlert('Something Went Wrong!❌'));
		dispatch(setLoading(false));
	}
});

export const updateNote = createAsyncThunk(
	'notes/updateNote',
	async (updatedNoteObj, { dispatch }) => {
		dispatch(setLoading(true));
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_HOST}/note/updateNote/${updatedNoteObj.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedNoteObj.obj)
				}
			);
			if (response.status === 200) {
				const res = await response.json();
				dispatch(fetchAllNotes(updatedNoteObj.email));
				dispatch(setLoading(false));
				return res;
			}
		} catch (error) {
			console.error(error);
			dispatch(setAlert('Something Went Wrong!❌'));
			dispatch(setLoading(false));
		}
	}
);
export const deleteNote = createAsyncThunk('notes/deleteNote', async (deleteNoteObj, { dispatch }) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(
			`${process.env.REACT_APP_API_HOST}/note/deleteNote/${deleteNoteObj.id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(deleteNoteObj.obj)
			}
		);
		if (response.status === 200) {
			const res = await response.json();
			dispatch(fetchAllNotes(deleteNoteObj.email));
			dispatch(setLoading(false));
			return res;
		}
	} catch (error) {
		console.error(error);
		dispatch(setAlert('Something Went Wrong!❌'));
		dispatch(setLoading(false));
	}
});

const notesSlice = createSlice({
	name: 'notes',
	initialState,
	extraReducers: {
		[fetchAllNotes.fulfilled]: (state, action) => {
			state.notes = action.payload;
		},
		[fetchAllNotes.rejected]: (state) => {
			state.notes = null;
		}
	}
});
export default notesSlice.reducer;
