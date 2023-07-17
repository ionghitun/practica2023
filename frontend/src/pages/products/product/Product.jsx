import { useParams } from 'react-router-dom';
import { IconPlus } from '@tabler/icons-react';
import { Group, Image, LoadingOverlay, Paper, Text, Title, Button, Card, Flex, ActionIcon } from '@mantine/core';
import { useGetProductImagesQuery, useGetProductQuery, useDeleteProductsImagesMutation } from '../../../state/products/api';
import { useDisclosure } from '@mantine/hooks';
import ModalAddEditProduct from '../ModalAddEditProduct';
import ModalAddImage from '../ModalAddImage';
import { IconTrash } from '@tabler/icons-react';

export default function Product() {
	const imageUrl = import.meta.env.VITE_API_IMAGE_URL;

	const { id } = useParams();

	const { data: product = {}, isFetching: isFetchingProduct } = useGetProductQuery({ id });

	const { data: productImages, isFetching: isFetchingProductImages } = useGetProductImagesQuery({ id });

	const [modalProductOpened, { open: modalProductOpen, close: modalProductClose }] = useDisclosure();
	const [modalAddImageOpened, { open: modalAddImageOpen, close: modalAddImageClose }] = useDisclosure();

	const [deleteProductImage] = useDeleteProductsImagesMutation();

	const handleCloseModalProduct = () => {
		modalProductClose();
	};

	const handleCloseModalImage = () => {
		modalAddImageClose();
	};

	const handleDeleteImage = async (imageId) => {
		await deleteProductImage(imageId);
	};

	return (
		<div>
			<LoadingOverlay visible={isFetchingProduct || isFetchingProductImages} />
			<ModalAddEditProduct opened={modalProductOpened} onClose={handleCloseModalProduct} product={product} />
			<Group mb='md' position='apart'>
				<Title>{product.name}</Title>
				<Button onClick={modalProductOpen} leftIcon={<IconPlus />}>
					Edit Product
				</Button>
			</Group>
			<Paper p='lg' radius='lg'>
				<Text>Name: {product?.name}</Text>
				<Text>Description: {product?.description}</Text>
				<Text>Price: {product?.price}</Text>
				<Text>Stock: {product?.stock}</Text>
				<Text>Category Id: {product?.category_id}</Text>
				<Text>Category Name: {product?.category?.name}</Text>
			</Paper>

			<Paper>
				<Group mb='md' position='apart'>
					<Title>Images</Title>
					<ModalAddImage opened={modalAddImageOpened} onClose={handleCloseModalImage} product={product} />
					<Button onClick={modalAddImageOpen} leftIcon={<IconPlus />}>
						Add Image
					</Button>
				</Group>
				<Flex mih={50} gap='md' justify='flex-start' align='center' direction='row' wrap='wrap'>
					{productImages &&
						productImages.map((image) => (
							<Card shadow='sm' padding='sm' radius='md' withBorder>
								<Image key={image.id} src={imageUrl + image.path} width={150} />
								<ActionIcon onClick={() => handleDeleteImage(image.id)}>
									<IconTrash />
								</ActionIcon>
							</Card>
						))}
				</Flex>
			</Paper>
		</div>
	);
}
