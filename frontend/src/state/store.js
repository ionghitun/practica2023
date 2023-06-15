import { configureStore } from '@reduxjs/toolkit';
import rtkQueryErrorLogger from './errorHandler';
import rootReducer from './rootReducer';
import middleware from './middlerware';

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware, rtkQueryErrorLogger),
});

export default store;
