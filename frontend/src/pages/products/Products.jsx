import { Title, LoadingOverlay, Paper, Table, Text, ActionIcon } from '@mantine/core';
import { useState } from 'react';
import { Button, Group, Modal, TextInput } from '@mantine/core';
import { useGetProductsQuery, useDeleteProductMutation } from '../../state/products/api';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate  } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Product from './product/Product';
import ModalAddEditProduct from './ModalAddEditProduct';

export default function Products() {
	const { data: products, isFetching: isFetchingProducts } = useGetProductsQuery();

	const navigate = useNavigate ();
	const [activeProduct, setActiveProduct] = useState(null);
	const [modalProductOpened, { open: modalProductOpen, close: modalProductClose }] = useDisclosure();
	const [deleteProduct, resultDeleteProduct] = useDeleteProductMutation();
	const [confirmDelete, setConfirmDelete] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

	console.log(products);

	const handleCloseModalProduct = () => {
		modalProductClose();
		setActiveProduct(null);
	};

	const toEdit = (product) => () => {
		navigate(`/products/${product.id}`);
	};

	const handleDelete = (product) => {
		setConfirmDelete(true);
		setProductToDelete(product);
	  };
	
	const handleCancelDelete = () => {
		setConfirmDelete(false);
		setProductToDelete(null);
	};

	const handleConfirmDelete = async () => {
		if (productToDelete) {
			await deleteProduct(productToDelete.id);
			setProductToDelete(null);
	}
		setConfirmDelete(false);
	};
	
	return (
		<div>
			<LoadingOverlay visible={isFetchingProducts} />
			<ModalAddEditProduct opened={modalProductOpened} onClose={handleCloseModalProduct} product={activeProduct} />
			<Modal opened={confirmDelete} onClose={handleCancelDelete} title="Confirm Delete" size="xs">
				<Text>Are you sure you want to delete this product?</Text>
				<Group position="right" mt="lg">
				<Button onClick={handleCancelDelete} variant="outline">
					Cancel
				</Button>
				<Button onClick={handleConfirmDelete} color="red">
					Delete
				</Button>
				</Group>
			</Modal>		
			<Group mb='md' position='apart'>
				<Title>Products</Title>
				<Button onClick={modalProductOpen} leftIcon={<IconPlus />}>
					Add Product
				</Button>
			</Group>
			<Paper>
				<Table highlightOnHover withBorder>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Price</th>
							<th>Stock</th>
							<th>Category Id</th>
							<th>Category Name</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product) => (
							<tr key={product.id}>
								<td>
									<Text>{product.name}</Text>
								</td>
								<td>
									<Text>{product.description}</Text>
								</td>
								<td>
									<Text>{product.price}</Text>
								</td>
								<td>
									<Text>{product.stock}</Text>
								</td>
								<td>
									<Text>{product.category_id}</Text>
								</td>
								<td>
									<Text>{product.category.name}</Text>
								</td>
								<td style={{ width: '100px' }}>
									<Group>
										<ActionIcon onClick={(toEdit(product))}>
											<IconEdit />
										</ActionIcon>
										<ActionIcon onClick={() => handleDelete(product)}>
											<IconTrash />
										</ActionIcon>
									</Group>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Paper>
		</div>
	);
}
