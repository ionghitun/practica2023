import api from '../emptySplitApi';

export const userEndpoints = api.injectEndpoints({
	endpoints: (builder) => ({
		getUserDetails: builder.query({
			query: () => ({ url: `/user` }),
			transformResponse: (res) => res.data,
			providesTags: (result) => [{ type: 'User', id: result?.id || 'LIST' }],
		}),
		getUser: builder.query({
			query: (id) => ({ url: `/user/${id}` }),
			transformResponse: (res) => res.data.result,
			providesTags: (result, error, id) => [{ type: 'User', id }],
		}),
		getUsers: builder.query({
			query: (params) => ({ url: '/users', params }),
			transformResponse: (res) => {
				return res.data;
			},
			providesTags: ({ result }) =>
				result ? [...result.map(({ id }) => ({ type: 'User', id })), { type: 'User', id: 'LIST' }] : [{ type: 'User', id: 'LIST' }],
		}),
		createUser: builder.mutation({
			query: (data) => ({
				url: '/user',
				method: 'POST',
				data,
			}),
			invalidatesTags: [{ type: 'User', id: 'LIST' }],
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: `/user/${data.id}`,
				method: 'PATCH',
				data,
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: 'User', id: 'LIST' },
				{ type: 'User', id },
			],
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/user/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'User', id: 'LIST' }],
		}),
		resetPasswordFromProfile: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/user/${id}/change-password`,
				method: 'PATCH',
				data,
			}),
		}),
		uploadAvatar: builder.mutation({
			query: ({ data, id }) => {
				return {
					url: `/user/${id}/avatar`,
					method: 'POST',
					data,
				};
			},
			invalidatesTags: (result, error, { id }) => [
				{ type: 'User', id: 'LIST' },
				{ type: 'User', id },
			],
		}),
		deleteAvatar: builder.mutation({
			query: (id) => ({
				url: `/user/${id}/delete-avatar`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: 'User', id: 'LIST' },
				{ type: 'User', id },
			],
		}),
		deleteAccount: builder.mutation({
			query: (id) => ({
				url: `/user/${id}/delete-account`,
				method: 'DELETE',
			}),
		}),
		getRoles: builder.query({
			query: (params) => ({
				url: '/roles',
				params,
			}),
			transformResponse: (res) => res.data?.result,
		}),
	}),
});

export const {
	useLazyGetUserQuery,
	useGetUserQuery,
	useGetUserDetailsQuery,
	useGetUsersQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useResetPasswordFromProfileMutation,
	useUploadAvatarMutation,
	useDeleteAvatarMutation,
	useDeleteAccountMutation,
	useGetRolesQuery,
} = userEndpoints;
