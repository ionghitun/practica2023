import { Group, Title, LoadingOverlay, Paper, Table, Text, ActionIcon } from '@mantine/core';
import { useGetProductsQuery } from '../../state/products/api';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export default function Products() {
	const { data: products, isFetching: isFetchingProducts } = useGetProductsQuery();

	console.log(products);

	return (
		<div>
			<LoadingOverlay visible={isFetchingProducts} />
			<Group mb='md' position='apart'>
				<Title>Products</Title>
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
										<ActionIcon onClick={() => {}}>
											<IconEdit />
										</ActionIcon>
										<ActionIcon onClick={() => {}}>
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
