import { ActionIcon, Button, Group, Paper, Table, Text, Title, LoadingOverlay } from '@mantine/core';
import { IconPlus, IconTrash, IconEye } from '@tabler/icons-react';
import { useGetProductsQuery } from '../../state/products/api';
import ModalAddEditProduct from './ModalAddEditProduct';
import ModalDeleteProduct from './ModalDeleteProduct';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Products() {
	const [activeProduct, setActiveProduct] = useState(null);
	const navigate = useNavigate();

	const { data: products, isFetching: isFetchingProducts } = useGetProductsQuery();

	const [modalProductOpened, { open: modalProductOpen, close: modalProductClose }] = useDisclosure();
	const [modalDeleteOpened, { open: openModalDelete, close: closeModalDelete }] = useDisclosure();

	const handleCloseModalProduct = () => {
		modalProductClose();
		setActiveProduct(null);
	};

	const handleEdit = (productId) => {
		navigate(`/products/${productId}`);
	};

	const handleDelete = (productId) => {
		setActiveProduct(productId);
		openModalDelete();
	};

	return (
		<div>
			<LoadingOverlay visible={isFetchingProducts} />
			<ModalAddEditProduct opened={modalProductOpened} onClose={handleCloseModalProduct} product={activeProduct} />
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
										<ActionIcon onClick={() => handleEdit(product.id)}>
											<IconEye />
										</ActionIcon>

										<ActionIcon onClick={() => handleDelete(product.id)}>
											<IconTrash />
										</ActionIcon>
									</Group>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Paper>
			{activeProduct && (
				<ModalDeleteProduct
					opened={modalDeleteOpened}
					onClose={() => {
						closeModalDelete();
						setActiveProduct(null);
					}}
					productId={activeProduct}
				/>
			)}
		</div>
	);
}
