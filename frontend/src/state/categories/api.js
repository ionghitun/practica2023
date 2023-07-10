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
		editCategories: builder.mutation({
			query: (data) => ({
				url: `/category/edit/${data.id}`,
				method:'PUT',
				data,
			}),
			invalidatesTags: ['Categories']
		}),
		deleteCategories: builder.mutation({
			query: (id) => ({
				url: `/category/delete/${id}`,
				method:'DELETE',
			}),
			invalidatesTags: ['Categories']
		}),
	}),
});

export const { useGetCategoriesQuery, useCreateCategoriesMutation, useEditCategoriesMutation, useDeleteCategoriesMutation } = categoriesEndpoints;
