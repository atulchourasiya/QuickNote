import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './Slice/themeSlice';
import loadingSlice from './Slice/loadingSlice';
import userSlice from './Slice/userSlice';
import viewSlice from './Slice/viewSlice';
import notesSlice from './Slice/notesSlice';
import beforeState from './Slice/beforeState';
import sharedEmail from './Slice/sharedEmail';
import alert from './Slice/alertSlice';
import settingSlice from './Slice/settingSlice';
import lableSlice from './Slice/lableSlice';
import editSlice from './Slice/editSlice';

const store = configureStore({
	reducer: {
		theme: themeSlice,
		loading: loadingSlice,
		view: viewSlice,
		user: userSlice,
		beforeState: beforeState,
		notes: notesSlice,
		sharedEmail :sharedEmail,
		alert:alert,
		setting:settingSlice,
		lable:lableSlice,
		edit: editSlice
	}
});

export default store;