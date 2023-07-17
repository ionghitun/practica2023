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
		createProducts: builder.mutation({
			query: (data) => ({
				url: '/product/add',
				method: 'POST',
				data,
			}),
			invalidatesTags: ['Products'],
		}),
		addProductImages: builder.mutation({
			query: (data) => ({
				url: `/product/${data.id}/images`,
				headers: { "Content-Type": "multipart/form-data" },
				method: 'POST',
				data:data.data,
				formData: true,
			}),
			invalidatesTags: ['Product'],
		}),
		updateProducts: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/product/edit/${id}`,
				method: 'PUT',
				data,
			}),
			invalidatesTags: ['Products'],
		}),
		deleteProducts: builder.mutation({
			query: (id) => ({
				url: `/product/delete/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Products'],//cum sigur functioneaza ?
		}),
		deleteProductsImages: builder.mutation({
			query: (id) => ({
				url: `/product/delete-image/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Product'],
		}),
	}),
});

export const { useGetProductsQuery,  useGetProductQuery, useGetProductImagesQuery, useCreateProductsMutation, useAddProductImagesMutation, useUpdateProductsMutation, useDeleteProductsMutation, useDeleteProductsImagesMutation } =
	productsEndpoints;
