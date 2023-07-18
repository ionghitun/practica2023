import { Group, Title, LoadingOverlay, Paper, Table, Text, ActionIcon, Button } from '@mantine/core';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import ModalAddEditProduct from './ModalAddEditProduct';
import { useDeleteProductMutation, useGetProductsQuery } from '../../state/products/api';

export default function Products() {
	const [modalProductOpened, { open: modalProductOpen, close: modalProductClose }] = useDisclosure();

	const { data: products, isFetching: isFetchingProducts } = useGetProductsQuery();
	const [deleteProduct, resultDeleteProduct] = useDeleteProductMutation();
	const navigate = useNavigate();

	const handleEditProduct = (id) => () => {
		navigate(`/products/${id}`);
	};

	const handleDeleteProduct = (id) => () => {
		notifications.show({
			title: 'Are you sure you want to delete?',
			autoClose: false,
			message: (
				<div>
					<Group mt='xl'>
						<Button variant='outline' onClick={() => notifications.clean()}>
							No
						</Button>
						<Button
							onClick={() => {
								deleteProduct(id);
								notifications.clean();
							}}
						>
							Yes
						</Button>
					</Group>
				</div>
			),
		});
	};

	return (
		<div>
			<ModalAddEditProduct opened={modalProductOpened} onClose={modalProductClose} />
			<LoadingOverlay visible={isFetchingProducts || resultDeleteProduct.isLoading} />
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
										<ActionIcon onClick={handleEditProduct(product.id)}>
											<IconEdit />
										</ActionIcon>
										<ActionIcon onClick={handleDeleteProduct(product.id)}>
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
