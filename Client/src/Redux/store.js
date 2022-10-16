import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './Slice/themeSlice';
import loadingSlice from './Slice/loadingSlice';
import userSlice from './Slice/userSlice';
import viewSlice from './Slice/viewSlice';
import notesSlice from './Slice/notesSlice';

const store = configureStore({
	reducer: {
		theme: themeSlice,
		loading: loadingSlice,
		view: viewSlice,
		user: userSlice,
		notes:notesSlice
	}
});

export default store;