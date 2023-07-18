import api from '../emptySplitApi';

export const productsEndpoints = api.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: (params) => ({ url: '/product/list', params }),
			transformResponse: (res) => {
				return res.data;
			},
			providesTags: ({ result }) =>
				result
					? [...result.map(({ id }) => ({ type: 'Product', id })), { type: 'Product', id: 'LIST' }]
					: [{ type: 'Product', id: 'LIST' }],
		}),
		getProduct: builder.query({
			query: ({ id }) => ({ url: `/product/${id}` }),
			transformResponse: (res) => {
				return res.data;
			},
			providesTags: (result, error, id) => [{ type: 'Product', id }],
		}),
		getProductImages: builder.query({
			query: ({ id }) => ({ url: `/product/${id}/images` }),
			transformResponse: (res) => {
				return res.data;
			},
			invalidatesTags: [{ type: 'Product' }],
		}),
		createProductImages: builder.mutation({
			query: ({ id, data }) => ({
				url: `/product/${id}/images`,
				method: 'POST',
				data,
			}),
			invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
		}),
		createProduct: builder.mutation({
			query: (data) => ({
				url: '/product/add',
				method: 'POST',
				data,
			}),
			invalidatesTags: [{ type: 'Product', id: 'LIST' }],
		}),
		updateProduct: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/product/edit/${id}`,
				method: 'PUT',
				data,
			}),
			invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
		}),
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `/product/delete/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Product' }],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductImagesQuery,
	useGetProductQuery,
	useCreateProductsMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useCreateProductMutation,
	useCreateProductImagesMutation,
} = productsEndpoints;
