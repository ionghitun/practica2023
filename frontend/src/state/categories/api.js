import api from '../emptySplitApi';

export const categoriesEndpoints = api.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: (params) => ({ url: '/category/list', params }),
			transformResponse: (res) => {
				return res.data;
			},
			providesTags: ['Categories'],
		}),
		createCategories: builder.mutation({
			query: (data) => ({
				url: '/category/add',
				method: 'POST',
				data,
			}),
			invalidatesTags: ['Categories'],
		}),
		deleteCategories: builder.mutation({
			query: (id) => ({
				url: '/category/${id}/delete',
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
		}),
	
	}),
});

export const { useGetCategoriesQuery, useCreateCategoriesMutation, useDeleteCategoriesMutation } = categoriesEndpoints;
