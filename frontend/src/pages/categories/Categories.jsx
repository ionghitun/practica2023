import { useState } from 'react';
import {
	useCreateCategoriesMutation,
	useGetCategoriesQuery,
	useEditCategoriesMutation,
	useDeleteCategoriesMutation,
} from '../../state/categories/api';
import { Button, Text, Card, Flex, Input } from '@mantine/core';
import { BsFillPencilFill, BsTrash3Fill, BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';

export default function Categories() {
	const [category, setCategory] = useState('');
	const [editCategoryValue, setEditCategoryValue] = useState('');
	const [editCategoryId, setEditCategoryId] = useState(null);
	const [error, setError] = useState('');

	const categoriesReq = useGetCategoriesQuery();
	const [addCategory, resultAddCategory] = useCreateCategoriesMutation();
	const [editCategory, resultEditCategory] = useEditCategoriesMutation();
	const [deleteCategory] = useDeleteCategoriesMutation();

	const handleAddCategory = () => {
		addCategory({ name: category });
	};

	const handleDeleteCategory = (id) => {
		deleteCategory(id);
	};

	const handleEditCategory = (id) => {
		if (editCategoryValue.trim() === '') {
			setError('Field cannot be empty!');
		} else {
			editCategory({ name: editCategoryValue, id: editCategoryId });
			setEditCategoryId('');
		}
	};

	const enableEdit = (category) => {
		setEditCategoryId(category.id);
		setEditCategoryValue(category.name);
	};
	return (
		<div>
			<Flex mih={50} gap='xl' align='center' direction='row' wrap='wrap'>
				<div>
					<Input
						placeholder='category'
						onChange={(e) => {
							setCategory(e.target.value);
						}}
					/>
				</div>
				<Button onClick={handleAddCategory}>Add</Button>
			</Flex>
			<p>Category is:{category}</p>
			<h2>Categories</h2>
			{categoriesReq?.data?.map((category) => (
				<Card shadow='sm' padding='lg' radius='md' mb='md' withBorder>
					<div key={category.id}>
						{editCategoryId === category.id && (
							<>
								<Flex mih={50} gap='xl' justify='space-between' align='center' direction='row' wrap='wrap'>
									<Input
										value={editCategoryValue}
										onChange={(e) => {
											setEditCategoryValue(e.target.value);
											if (e.target.value.trim() !== '') {
												setError('');
											}
										}}
									/>
									<div>
										<Button onClick={handleEditCategory} mr='md'>
											<BsFillCheckCircleFill />
										</Button>
										<Button onClick={() => setEditCategoryId(null)}>
											<BsFillXCircleFill />
										</Button>
									</div>
									{error && <Text c='red'>{error}</Text>}
								</Flex>
							</>
						)}
						{editCategoryId !== category.id && (
							<>
								<Flex mih={50} gap='xl' justify='space-between' align='center' direction='row' wrap='wrap'>
									<p>{category.name}</p>
									<div>
										<Button onClick={() => enableEdit(category)} mr='md'>
											<BsFillPencilFill />
										</Button>
										<Button onClick={() => handleDeleteCategory(category.id)}>
											<BsTrash3Fill />
										</Button>
									</div>
								</Flex>
							</>
						)}
					</div>
				</Card>
			))}
		</div>
	);
}
