import { isRejectedWithValue } from '@reduxjs/toolkit';

function renderErrorMessage(errorMessage) {
	if (typeof errorMessage === 'string') {
		// Render a new line for a string
		return errorMessage;
	} else if (typeof errorMessage === 'object' && errorMessage !== null) {
		// Render a new line for each value in the object
		return Object.values(errorMessage).map((value) => {
			return <div>{value}</div>;
		});
	} else {
		console.log('Invalid error message format');
	}
}

/**
 * Log a warning and show a toast!
 */
const rtkQueryErrorLogger = () => (next) => (action) => {
	// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
	if (isRejectedWithValue(action)) {
		if (action.payload.status === 401 && action.payload.data.errorMessage === 'unauthenticated') {
			// store.dispatch(api.util.resetApiState());
			// if (window.location.pathname !== '/login') {
			// 	window.location.href = '/login';
			// }
			return next(action);
		}

		if (action.payload.status === 401 && action.payload.data.errorMessage === 'unauthorized') {
			window.location.href = '/unauthorized';
		}

		// return false;
		// notifications.show({
		// 	title: 'Eroare',
		// 	message: renderErrorMessage(action.payload.data.errorMessage),
		// 	color: 'red',
		// 	icon: <IconExclamationMark />,
		// });

		console.warn('We got a rejected action!', action);
	}

	return next(action);
};

export default rtkQueryErrorLogger;
