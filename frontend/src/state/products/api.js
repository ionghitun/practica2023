import api from '../emptySplitApi';

export const productsEndpoints = api.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: (params) => ({ url: '/product/list', params }),
			transformResponse: (res) => {
				return res.data;
			},
			providesTags: ['Products'],
		}),
		getProduct: builder.query({
			query: ({ id }) => ({ url: `/product/${id}` }),
			transformResponse: (res) => {
				return res.data;
			},
			providesTags: ['Product'],
		}),
		getProductImages: builder.query({
			query: ({ id }) => ({ url: `/product/${id}/images` }),
			transformResponse: (res) => {
				return res.data;
			},
			providesTags: ['Product'],
		}),
		createProduct: builder.mutation({
			query: (data) => ({
				url: '/product/add',
				method: 'POST',
				data,
			}),
			invalidatesTags: ['Products'],
		}),
		updateProduct: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/product/edit/${id}`,
				method: 'PUT',
				data,
			}),
			invalidatesTags: ['Products'],
		}),
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `/product/delete/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Products'],
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
} = productsEndpoints;
