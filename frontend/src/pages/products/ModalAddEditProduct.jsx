import { useState, useEffect } from 'react';
import { Button, Group, Modal, TextInput, LoadingOverlay, Select, Stack, FileInput } from '@mantine/core';
import { useCreateProductImagesMutation, useCreateProductMutation, useUpdateProductMutation } from '../../state/products/api';
import { useGetCategoriesQuery } from '../../state/categories/api';

const defaultValues = {
	name: '',
	category_id: '',
	description: '',
	price: 0,
	stock: '',
	images: [],
};

export default function ModalAddEditProduct({ opened = false, onClose = null, product = null }) {
	const [productInfo, setProductInfo] = useState(defaultValues);

	const { data: categories, isFetching: isFetchingCategories } = useGetCategoriesQuery();

	const [addProduct, resultAddProduct] = useCreateProductMutation();
	const [addImages, resultAddImages] = useCreateProductImagesMutation();
	const [updateProduct, resultUpdateProduct] = useUpdateProductMutation();

	useEffect(() => {
		if (opened && product?.id) {
			setProductInfo({
				name: product.name,
				category_id: product.category_id,
				description: product.description,
				price: product.price,
				stock: product.stock,
			});
		}
	}, [opened, product]);

	const handleClose = () => {
		onClose();
		setProductInfo(defaultValues);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProductInfo((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (value) => {
		setProductInfo((prev) => ({ ...prev, category_id: value }));
	};

	const handleFileChange = (value) => {
		setProductInfo((prev) => ({ ...prev, images: value }));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			name: productInfo.name,
			category_id: productInfo.category_id,
			description: productInfo.description,
			price: parseFloat(productInfo.price),
			stock: parseInt(productInfo.stock),
		};

		if (product) {
			payload.id = product.id;
		}

		const resultAddEditProduct = product ? await updateProduct(payload) : await addProduct(payload);

		if (!resultAddEditProduct.error) {
			if (!productInfo.images?.length) {
				return handleClose();
			}

			const formData = new FormData();

			productInfo.images.forEach((file) => {
				formData.append('images[]', file);
			});

			const resultAddEditImages = await addImages({ id: resultAddEditProduct?.data?.data.id, data: formData });
			if (!resultAddEditImages.error) {
				handleClose();
			}
		}
	};

	return (
		<Modal opened={opened} onClose={handleClose} title={product ? 'Edit Product' : 'Add Product'}>
			<LoadingOverlay
				visible={resultAddProduct.isLoading || resultUpdateProduct.isLoading || resultAddImages.isLoading || isFetchingCategories}
			/>
			<form onSubmit={onSubmit}>
				<Stack spacing={10}>
					<TextInput label='Name' placeholder='Name' name='name' value={productInfo.name} onChange={handleChange}></TextInput>
					<TextInput
						label='Description'
						placeholder='Description'
						name='description'
						value={productInfo.description}
						onChange={handleChange}
					></TextInput>
					<TextInput label='Price' placeholder='Price' name='price' value={productInfo.price} onChange={handleChange}></TextInput>
					<TextInput label='Stock' placeholder='Stock' name='stock' value={productInfo.stock} onChange={handleChange}></TextInput>
					<Select
						label='Category'
						placeholder='Pick one'
						searchable
						clearable
						onChange={handleSelectChange}
						value={productInfo.category_id}
						data={categories?.map((category) => ({ value: category.id, label: category.name })) || []}
					/>
					<FileInput
						label='Images'
						placeholder='Pick Images'
						multiple
						value={productInfo.images}
						onChange={handleFileChange}
						accept='image/png,image/jpeg'
					/>
				</Stack>
				<Group position='right' mt='lg'>
					<Button variant='outline' onClick={handleClose}>
						Close
					</Button>
					<Button type='submit'>Save</Button>
				</Group>
			</form>
		</Modal>
	);
}
