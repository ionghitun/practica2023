import { useDeleteProductsMutation } from '../../state/products/api';
import React from 'react';
import { Button, Group, Modal, Text, LoadingOverlay } from '@mantine/core';

export default function ModalDeleteProduct({ opened = false, onClose = null, productId = null }) {
	const [deleteProduct, resultDeleteProduct] = useDeleteProductsMutation();

	const handleClose = () => {
		if (onClose) {
			onClose();
		}
	};

	const handleDelete = async () => {
		await deleteProduct(productId);
		onClose();
	};

	return (
		<>
			<LoadingOverlay visible={resultDeleteProduct.isLoading} />
			<Modal opened={opened} title='Delete Product'>
				<Text>Are you sure you want to delete?</Text>

				<Group position='right' mt='lg'>
					<Button variant='outline' onClick={handleClose}>
						Close
					</Button>
					<Button onClick={() => handleDelete()}>Delete</Button>
				</Group>
			</Modal>
		</>
	);
}
