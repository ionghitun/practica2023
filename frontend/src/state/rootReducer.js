import { combineReducers } from '@reduxjs/toolkit';
import api from './emptySplitApi';

const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
});

export default rootReducer;
