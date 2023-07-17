import { useState, useEffect } from 'react';
import { Button, Group, Modal, TextInput, LoadingOverlay, Select } from '@mantine/core';
import { useCreateProductsMutation, useUpdateProductsMutation } from '../../state/products/api';
import { useGetCategoriesQuery } from '../../state/categories/api';

export default function ModalAddEditProduct({ opened = false, onClose = null, product = null }) {
	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [productPrice, setProductPrice] = useState(null);
	const [productStock, setProductStock] = useState(null);
	const [productCategoryId, setProductCategoryId] = useState(null);

	const [addProduct, resultAddProduct] = useCreateProductsMutation();
	const [updateProduct, resultUpdateProduct] = useUpdateProductsMutation();

	const { data: categories } = useGetCategoriesQuery();

	useEffect(() => {
		if (product) {
			setProductName(product.name);
			setProductDescription(product.description);
			setProductPrice(product.price);
			setProductStock(product.stock);
			setProductCategoryId(product.category_id);
		}
	}, [product]);

	const handleClose = () => {
		onClose();
		setProductName('');
		setProductDescription('');
		setProductPrice(null);
		setProductStock(null);
		setProductCategoryId(null);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const updatedProduct = {
			name: productName,
			description: productDescription,
			price: productPrice,
			stock: productStock,
			category_id: productCategoryId,
		};

		const result = product ? await updateProduct({ ...updatedProduct, id: product.id }) : await addProduct(updatedProduct);

		if (!result.error) {
			handleClose();
		}
	};

	return (
		<Modal opened={opened} onClose={handleClose} title={product ? 'Edit Product' : 'Add Product'}>
			<LoadingOverlay visible={resultAddProduct.isLoading || resultUpdateProduct.isLoading} />
			<form onSubmit={onSubmit}>
				<TextInput label='Product' placeholder='Name' value={productName} onChange={(e) => setProductName(e.target.value)} />

				<TextInput
					label='Description'
					placeholder='Description'
					value={productDescription}
					onChange={(e) => setProductDescription(e.target.value)}
					a
				/>

				<TextInput
					type='number'
					label='Price'
					placeholder='Price'
					value={productPrice}
					onChange={(e) => setProductPrice(parseFloat(e.target.value))}
				/>

				<TextInput
					type='number'
					label='Stock'
					placeholder='Stock'
					value={productStock}
					onChange={(e) => setProductStock(parseInt(e.target.value, 10))}
				/>

				<Select
					label='Category'
					placeholder='Category'
					value={categories && productCategoryId ? categories.find((categoryItem) => categoryItem.id === productCategoryId).id : ''}
					onChange={(e) => setProductCategoryId(e)}
					data={
						categories
							? categories.map((cat) => {
									let obj = {
										label: cat.name,
										value: cat.id,
									};
									return obj;
							  })
							: []
					}
				/>

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
