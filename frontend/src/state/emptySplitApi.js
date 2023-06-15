import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

export const axiosBaseQuery = async ({ url, method, data, params, ...rest }) => {
	try {
		const config = {
			url: import.meta.env.VITE_API_URL + url,
			method,
			data,
			params,
			...rest,
		};

		const token = localStorage.getItem('token');

		if (token) {
			config.headers = {
				Authorization: `Bearer ${token}`,
			};
		}

		const result = await axios(config);
		return { data: result.data };
	} catch (axiosError) {
		return {
			error: {
				status: axiosError.response?.status,
				data: axiosError.response?.data || axiosError.message,
			},
		};
	}
};

const api = createApi({
	baseQuery: axiosBaseQuery,
	endpoints: () => ({}),
});

export default api;
