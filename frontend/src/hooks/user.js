import { useMemo } from 'react';
import api from '../state/emptySplitApi';

export const useAuth = () => {
	const { currentData: user } = api.endpoints.getUserDetails.useQueryState();
	console.log(344, user);
	return useMemo(
		() => ({
			user,
		}),
		[user]
	);
};
