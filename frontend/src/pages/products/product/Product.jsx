import { useParams } from 'react-router-dom';
import { Button, Group, Image, LoadingOverlay, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import ModalAddEditProduct from '../ModalAddEditProduct';
import { useGetProductQuery } from '../../../state/products/api';

export default function Product() {
	const { id } = useParams();

	const [modalProductOpened, { open: modalProductOpen, close: modalProductClose }] = useDisclosure();

	const { data: product = {}, isFetching: isFetchingProduct } = useGetProductQuery({ id });

	return (
		<div>
			<ModalAddEditProduct opened={modalProductOpened} onClose={modalProductClose} product={product} />
			<LoadingOverlay visible={isFetchingProduct} />
			<Group mb='md' position='apart'>
				<Title>{product.name}</Title>
				<Button onClick={modalProductOpen} leftIcon={<IconEdit />}>
					Edit Product
				</Button>
			</Group>
			<Paper p='lg' radius='lg'>
				<Text>Description: {product.description}</Text>
				<Text>Category Name: {product.category?.name}</Text>
				<Text>Price: {product.price}</Text>
				<Text>Stock: {product.stock}</Text>
				<Text>Category Id: {product.category_id}</Text>
			</Paper>
			<Paper my='xl'>
				<Title mb='xl'>Gallery</Title>
				{!!product?.product_images?.length && (
					<SimpleGrid cols={6} spacing='xl'>
						{product?.product_images?.map((productImage) => (
							<Image key={productImage.id} src={productImage.image_url} fit='cover' height={200} radius='lg' />
						))}
					</SimpleGrid>
				)}
				{!product?.product_images?.length && <Text>No images</Text>}
			</Paper>
		</div>
	);
}
