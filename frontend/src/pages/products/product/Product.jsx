import { useParams } from 'react-router-dom';
import { Group, Image, LoadingOverlay, Paper, Text, Title } from '@mantine/core';
import { useGetProductImagesQuery, useGetProductQuery } from '../../../state/products/api';

export default function Product() {
	const { id } = useParams();

	const { data: product = {}, isFetching: isFetchingProduct } = useGetProductQuery({ id });
	const { data: productImages, isFetching: isFetchingProductImages } = useGetProductImagesQuery({ id });

	return (
		<div>
			<LoadingOverlay visible={isFetchingProduct || isFetchingProductImages} />
			<Group mb='md' position='apart'>
				{/* <Title>{product.name}</Title> */}
			</Group>
			<Paper p='lg' radius='lg'>
				<Text>Name: product</Text>
				<Text>Description: product</Text>
				<Text>Price: product</Text>
				<Text>Stock: product</Text>
				<Text>Category Id: product</Text>
				<Text>Category Name: product</Text>
			</Paper>

			<Paper>
				<Title>Images</Title>
				<Image src='productimageurl' />
			</Paper>
		</div>
	);
}
