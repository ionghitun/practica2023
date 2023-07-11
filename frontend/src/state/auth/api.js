import api from '../emptySplitApi';

export const authEndpoints = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: '/login',
				method: 'POST',
				data,
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled;
					if (res?.data?.data?.token) {
						localStorage.setItem('token', res.data.data.token);
					}
					dispatch(api.util.resetApiState());
					await dispatch(api.endpoints.getUserDetails.initiate(undefined, { forceRefetch: true }));
				} catch (error) {
					console.log(error);
				}
			},
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/logout',
				method: 'POST',
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(api.util.resetApiState());
					await dispatch(api.endpoints.getUserDetails.initiate(undefined, { forceRefetch: true }));
				} catch (error) {
					console.log(error);
				}
			},
		}),
		register: builder.mutation({
			query: (data) => ({
				url: '/register',
				method: 'POST',
				data,
			}),
		}),
		forgotPassword: builder.mutation({
			query: (data) => ({
				url: '/forgot-password',
				method: 'POST',
				data,
			}),
		}),
		changePassword: builder.mutation({
			query: (data) => ({
				url: '/change-password',
				method: 'POST',
				data,
			}),
		}),
		resetPassword: builder.mutation({
			query: (data) => ({
				url: '/change-password',
				method: 'POST',
				data,
			}),
		}),
		verifyEmail: builder.mutation({
			query: (data) => ({
				url: '/verify-email',
				method: 'POST',
				data,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useLazyGetCsrfTokenQuery,
	useForgotPasswordMutation,
	useVerifyEmailMutation,
	useChangePasswordMutation,
	useResetPasswordMutation,
} = authEndpoints;
