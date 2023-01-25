import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setInitialLoading, setLoading } from './loadingSlice';
import { setAlert } from './alertSlice';

const initialState = {
	notes: null,
	updated: false
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
		} else if (response.status === 401) {
			window.open(`${process.env.REACT_APP_API_HOST}/auth/google`, '_self');
		} else throw new Error('Something went wrong!');
	} catch (err) {
		console.error(err);
		dispatch(setInitialLoading(false));
		dispatch(setLoading(false));
		return null;
	}
});
export const addANote = createAsyncThunk('notes/addNote', async (note, { dispatch }) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/note/addNote`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note.obj)
		});
		if (response.status === 200) {
			const res = await response.json();
			dispatch(setAlert('Note Is Added Successfully!✅'));
			dispatch(fetchAllNotes(note.email));
			dispatch(setLoading(false));
			return res;
		} else if (response.status === 401) {
			window.open(`${process.env.REACT_APP_API_HOST}/auth/google`, '_self');
		} else throw new Error('Something went wrong!');
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
					credentials: 'include',
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
			} else if (response.status === 401) {
				window.open(`${process.env.REACT_APP_API_HOST}/auth/google`, '_self');
			} else throw new Error('Something went wrong!');
		} catch (error) {
			console.error(error);
			dispatch(setAlert('Something Went Wrong!❌'));
			dispatch(setLoading(false));
		}
	}
);
export const deleteNote = createAsyncThunk(
	'notes/deleteNote',
	async (deleteNoteObj, { dispatch }) => {
		dispatch(setLoading(true));
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_HOST}/note/deleteNote/${deleteNoteObj.id}`,
				{
					method: 'DELETE',
					credentials: 'include',
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
			} else if (response.status === 401) {
				window.open(`${process.env.REACT_APP_API_HOST}/auth/google`, '_self');
			} else throw new Error('Something went wrong!');
		} catch (error) {
			console.error(error);
			dispatch(setAlert('Something Went Wrong!❌'));
			dispatch(setLoading(false));
		}
	}
);
export const updateManyNote = createAsyncThunk(
	'notes/updateManyNote',
	async (Noteobj, { dispatch }) => {
		dispatch(setLoading(true));
		try {
			const response = await fetch(`${process.env.REACT_APP_API_HOST}/note/updateManyNote`, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(Noteobj.obj)
			});
			if (response.status === 200) {
				const res = await response.json();
				dispatch(fetchAllNotes(Noteobj.email));
				dispatch(setLoading(false));
				return res;
			} else if (response.status === 401) {
				window.open(`${process.env.REACT_APP_API_HOST}/auth/google`, '_self');
			} else throw new Error('Something went wrong!');
		} catch (error) {
			console.error(error);
			dispatch(setAlert('Something Went Wrong!❌'));
			dispatch(setLoading(false));
		}
	}
);
const notesSlice = createSlice({
	name: 'notes',
	initialState,
	extraReducers: {
		[fetchAllNotes.fulfilled]: (state, action) => {
			state.notes = action.payload;
		},
		[fetchAllNotes.rejected]: (state) => {
			state.notes = null;
		},
		[updateManyNote.fulfilled]: (state, action) => {
			state.updated = true;
		},
		[updateManyNote.rejected]: (state) => {
			state.updated = false;
		}
	},
	reducers: {
		setUpdated(state, action) {
			state.updated = action.payload;
		}
	}
});
export const { setUpdated } = notesSlice.actions;
export default notesSlice.reducer;
