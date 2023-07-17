import { useAddProductImagesMutation } from '../../state/products/api';
import React, { useEffect, useState } from 'react';
import { Button, Group, Modal, LoadingOverlay, FileInput } from '@mantine/core';

export default function ModalAddImage({ opened = false, onClose = null, product = null }) {
	const [addImage, resultAddImage] = useAddProductImagesMutation();
	const [productImage, setProductImage] = useState(null);

	const handleClose = () => {
		onClose();
		setProductImage([]);
	};

	useEffect(() => {
		if (product) {
			setProductImage(product.images);
		}
	}, [product]);

	const onSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('images', productImage);

		const result = await addImage({ data: formData, id: product.id });

		if (!result.error) {
			handleClose();
		}
	};

	return (
		<>
			<LoadingOverlay visible={resultAddImage.isLoading} />
			<Modal opened={opened} title='Add Images'>
				<form onSubmit={onSubmit}>
					<FileInput
						placeholder='Pick file'
						label='Choose file'
						radius='md'
						withAsterisk
						type='file'
						id='image'
						name='image'
						value={productImage}
						onChange={(e) => {
							setProductImage(e);
						}}
					/>

					<Group position='right' mt='lg'>
						<Button variant='outline' onClick={handleClose}>
							Close
						</Button>
						<Button type='submit'>Add</Button>
					</Group>
				</form>
			</Modal>
		</>
	);
}
