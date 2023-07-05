import { isRejectedWithValue } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';
import { IconExclamationMark } from '@tabler/icons-react';
import { Text } from '@mantine/core';

function ErrorMessage({ messages = [] }) {
	return (
		<div>
			{messages?.map((message) => (
				<Text key={message}>{message}</Text>
			))}
		</div>
	);
}

/**
 * Log a warning and show a toast!
 */
const rtkQueryErrorLogger = () => (next) => (action) => {
	// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
	if (isRejectedWithValue(action)) {
		if (action.payload.status === 401 && action.payload.data.message === 'Unauthenticated.') {
			return next(action);
		}

		if (action.payload.status === 401 && action.payload.data.message === 'unauthorized') {
			window.location.href = '/unauthorized';
		}

		let errorMessages = [];

		if (action.payload?.data?.message) {
			errorMessages = [action.payload.data.message];
		}

		if (action?.payload?.data?.errors && Object.values(action.payload.data.errors)?.flat()) {
			errorMessages = Object.values(action.payload.data.errors).flat();
		}

		notifications.show({
			title: 'Error',
			message: <ErrorMessage messages={errorMessages} />,
			color: 'red',
			icon: <IconExclamationMark />,
		});

		console.warn('We got a rejected action!', action);
	}

	return next(action);
};

export default rtkQueryErrorLogger;
