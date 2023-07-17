import { useState, useEffect } from 'react';
import { Button, Group, Modal, TextInput, LoadingOverlay } from '@mantine/core';
import { useCreateProductMutation, useUpdateProductMutation } from '../../state/products/api';
import { useNavigate } from 'react-router-dom';

export default function ModalAddEditProduct({ opened = false, onClose = null, product: product = null }) {
	const [productCategoryId, setProductCategoryId] = useState('');
	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [productPrice, setProductPrice] = useState('');
	const [productStock, setProductStock] = useState('');

	const [addProduct, resultAddProduct] = useCreateProductMutation();
	const [updateProduct, resultUpdateProduct] = useUpdateProductMutation();

	useEffect(() => {
		if (product) {
			setProductCategoryId(product.category_id);
			setProductName(product.name);
			setProductDescription(product.description);
			setProductPrice(product.price);
			setProductStock(product.stock);
		}
	}, [product]);

	const handleClose = () => {
		onClose();
		setProductCategoryId('');
		setProductName('');
		setProductDescription('');
		setProductPrice('');
		setProductStock('');
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const productData = {
			category_id: productCategoryId,
			name: productName,
			description: productDescription,
			price: productPrice,
			stock: productStock,
		};

		const result = product ? await updateProduct({ id: product.id, ...productData }) : await addProduct(productData);

		if (!result.error) {
			handleClose();
		}
	};

	return (
		<Modal opened={opened} onClose={handleClose} title={product ? 'Edit Product' : 'Add Product'}>
			<LoadingOverlay visible={resultAddProduct.isLoading || resultUpdateProduct.isLoading} />
			<form onSubmit={onSubmit}>
				<TextInput
					label='Category ID'
					placeholder='Category ID'
					value={productCategoryId}
					onChange={(e) => setProductCategoryId(e.target.value)}
				/>
				<TextInput label='Product Name' placeholder='Name' value={productName} onChange={(e) => setProductName(e.target.value)} />
				<TextInput
					label='Product Description'
					placeholder='Description'
					value={productDescription}
					onChange={(e) => setProductDescription(e.target.value)}
				/>
				<TextInput label='Product Price' placeholder='Price' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
				<TextInput label='Product Stock' placeholder='Stock' value={productStock} onChange={(e) => setProductStock(e.target.value)} />

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
