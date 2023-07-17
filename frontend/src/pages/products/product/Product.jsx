import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { ActionIcon, Button, Group, Paper, Table, Text, Title, LoadingOverlay } from '@mantine/core';
import { useGetProductImagesQuery, useGetProductQuery, useCreateProductImagesMutation } from '../../../state/products/api';
import { Image } from '@mantine/core';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';

import ModalAddEditProduct from '../ModalAddEditProduct';

export default function Product() {
	const { id } = useParams();

	const { data: product = {}, isFetching: isFetchingProduct } = useGetProductQuery({ id });
	const { data: productImages, isFetching: isFetchingProductImages } = useGetProductImagesQuery({ id });
	const navigate = useNavigate ();
	const [modalProductOpened, { open: modalProductOpen, close: modalProductClose }] = useDisclosure();
	const [activeProduct, setActiveProduct] = useState(null);
	const [createProductImages] = useCreateProductImagesMutation();
	const [imageData, setImageData] = useState("");
	const categoryName = product?.category?.name || 'N/A';

	const handleCloseModalProduct = () => {
		modalProductClose();
		setActiveProduct(null);
		window.location.reload();
	};

	const handleEdit = (product) => () => {
		setActiveProduct(product);
		modalProductOpen();
	};
	
	const handleAddImages = async (e) => {
		e.preventDefault();
	
		const input = document.createElement('input');
		input.type = 'file';
		input.multiple = true;
	
		input.addEventListener('change', async (event) => {
		  const selectedImages = Array.from(event.target.files);
		  const formData = new FormData();
	
		  for (const image of selectedImages) {
			formData.append('images', image);
		  }
	
		  await createProductImages({ id: product.id , images: formData });
		});
	
		input.click();
	  };
	

	console.log(productImages);	

	return (
		<div>
			<LoadingOverlay visible={isFetchingProduct} />
			<ModalAddEditProduct opened={modalProductOpened} onClose={handleCloseModalProduct} product={activeProduct} />
			<Group mb='md' position='apart'>
				<Title>{product.name}</Title>
				<Button onClick={handleEdit(product)} leftIcon={<IconPlus />}>
					Edit Product
				</Button>
			</Group>
			<Paper>
				<Table>
				<tbody>
					<tr>
						<td>Name:</td>
						<td>{product.name}</td>
					</tr>
					<tr>
						<td>Description:</td>
						<td>{product.description}</td>
					</tr>
					<tr>
						<td>Price:</td>
						<td>{product.price}</td>

					</tr>
					<tr>
						<td>Stock:</td>
						<td>{product.stock}</td>
					</tr>
					<tr>
						<td>Category ID:</td>
						<td>{product.category_id}</td>
					</tr>
					<tr>
						<td>Category name:</td>
						<td>{categoryName}</td>
					</tr>
				</tbody>
				</Table>
      		</Paper>
			<Paper>
				<Title>Images</Title>
				{isFetchingProductImages ? (
					<LoadingOverlay visible={isFetchingProductImages} />
					) : (
					<div>
						{productImages?.map((image) => (
						<Image key={image.id} src={`http://localhost:8000/storage/${image.path}`} alt={`Product Image ${image.id}`} width={"200px"}/>
						))}
					   <Button onClick={handleAddImages} leftIcon={<IconPlus />}>
							Add Images
						</Button>
					</div>
				)}
			</Paper>

		</div>
	);
}
