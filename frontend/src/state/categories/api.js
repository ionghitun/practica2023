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
		updateCategory: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/category/edit/${id}`,
				method: 'PUT',
				data,
			}),
			invalidatesTags: ['Categories'],
		}),
		deleteCategory: builder.mutation({
			query: (id) => ({
				url: `/category/edit/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Categories'],
		}),
	}),
});

export const { useGetCategoriesQuery, useCreateCategoriesMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } =
	categoriesEndpoints;
