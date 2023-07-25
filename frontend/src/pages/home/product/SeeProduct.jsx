import { Badge, Image, LoadingOverlay, Paper, Text, Flex, ActionIcon } from '@mantine/core';
import { useGetPublicProductQuery } from '../../../state/products/api';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/header';
import { useState} from 'react';
import { Carousel } from '@mantine/carousel';
import { IconArrowBack } from '@tabler/icons-react';

export default function SeeProduct() {
	const { id } = useParams();
	const [opened, setOpened] = useState(false);
	const navigate = useNavigate();

	const { data: product = {}, isFetching: isFetchingProduct } = useGetPublicProductQuery({ id });

	const handleBack = () => {
		navigate('/');
	};

	return (
		<div>
			<Header opened={opened} setOpened={setOpened} />
			<LoadingOverlay visible={isFetchingProduct} />
			<div style={{ margin: '30px' }}>
				<ActionIcon onClick={handleBack}>
					<IconArrowBack />
				</ActionIcon>
				<Flex mih={50} gap='lg' justify='space-between' align='center' direction='column' wrap='wrap'>
					<Paper my='xl' style={{ maxWidth: 800 }}>
						{!!product?.product_images?.length ? (
							<Carousel mx='auto' maw={600} withIndicators>
								{product?.product_images?.map((productImage) => (
									<Carousel.Slide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
										<Image src={productImage.image_url} alt='photo' height={300} width={300} />
									</Carousel.Slide>
								))}
							</Carousel>
						) : (
							<Text>No images</Text>
						)}
					</Paper>
					<Paper p='lg' radius='lg'>
						<Flex mih={50} gap='lg' justify='space-between' align='center' direction='row' wrap='wrap'>
							<h1>{product.name}</h1>
							<Badge size='lg'>{product.price}</Badge>
						</Flex>
						<Badge size='lg' color='teal' variant='light' radius='xs'>
							{product.category?.name}
						</Badge>
						<h2>Description</h2>
						<Text>{product.description}</Text>
					</Paper>
				</Flex>
			</div>
			<MantineFooter opened={opened} setOpened={setOpened} />
		</div>
	);
}
