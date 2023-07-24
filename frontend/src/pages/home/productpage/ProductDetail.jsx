import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button, Group, Image, LoadingOverlay, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { useGetProductQuery } from '../../../state/products/api';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';

export default function ProductDetail() {
	const { id } = useParams();
	const [opened, setOpened] = useState(false);
	const { data: product = {}, isFetching: isFetchingProduct } = useGetProductQuery({ id });

    const navigate = useNavigate();

    const handleBackBtn = () => () => {
		navigate(`/`);
	};
	return (       
		<div>
			
		<Header opened={opened} setOpened={setOpened} />
		<LoadingOverlay visible={isFetchingProduct} />

		<div style={{ padding: '24px' }}>
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
					<Paper my="xl">
						{!!product?.product_images?.length && (
							<Carousel maw={320} mx="auto" withIndicators height={200}>
								{product?.product_images?.map((productImage) => (
									<Carousel.Slide key={productImage.id}>
										<Image src={productImage.image_url} fit="cover" height={200} radius="lg" />
									</Carousel.Slide>
								))}
							</Carousel>
					)}
					{!product?.product_images?.length && <Text>No images</Text>}
					</Paper>				
			<div style={{ marginLeft: '24px' }}>
					<Title>{product.name}</Title>
					<Text>Price: {product.price}</Text>
					<Button variant="outline" color="blue">
						Add to Cart
					</Button>
				</div>
			</div>

			<Paper p="lg" radius="lg">
				<Title size="sm">Product Description</Title>
				<Text>{product.description}</Text>
			</Paper>

			<Paper p="lg" radius="lg" mt="24px">
				<Title size="sm">Specifications</Title>
				<Text>Category Name: {product.category?.name}</Text>
				<Text>Stock: {product.stock}</Text>
			</Paper>

			<Group mt="lg" position="center">
				<Button variant="light" size="lg" onClick={handleBackBtn()} style={{ fontSize: 20 }}>
					Back to main page
				</Button>
        	</Group>

		</div>
	  </div>
	);
}
