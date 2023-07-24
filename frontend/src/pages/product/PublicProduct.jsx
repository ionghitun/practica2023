import { useState } from 'react';
import React from 'react';
import { Container, Paper, Title, Text, Image, Badge, Button, Group, LoadingOverlay } from '@mantine/core';
import Header from '../../components/header';
import { useGetPublicProductsQuery } from '../../state/products/api';

import { useParams } from 'react-router-dom';

function PublicProduct() {
	const { id } = useParams();
	const { data: products = {}, isLoading } = useGetPublicProductsQuery({ product_id: id, page: 1, per_page: 1 });

	const [opened, setOpened] = useState(false);

	const singleProduct = products?.data?.[0];

	const images = singleProduct?.product_images?.map((image) => image.image_url) || [];

	if (isLoading) {
		return (
			<LoadingOverlay visible>
				<div style={{ height: '400px' }}></div>
			</LoadingOverlay>
		);
	}
	if (!singleProduct) {
		return null;
	}

	return (
		<div>
			<Header opened={opened} setOpened={setOpened} />
			<Container size='lg'>
				<Paper mt='xl' p='lg'>
					<Title align='center' py='lg'>
						{singleProduct.name}
					</Title>

					<Image src={singleProduct?.product_images?.[0]?.image_url} withPlaceholder height={400} alt={singleProduct.name} />
					<Group position='right' mt='md' mb='xs'>
						<Badge color='dark' size='xl' radius='sm' variant='outline'>
							{singleProduct.price} USD
						</Badge>

						<Button variant='light' color='blue' radius='md'>
							Add to Cart
						</Button>
						<Button variant='light' color='red' radius='md'>
							Add to List
						</Button>
					</Group>
					<Text size='lg'>{singleProduct.description}</Text>
				</Paper>
			</Container>
		</div>
	);
}

export default PublicProduct;
