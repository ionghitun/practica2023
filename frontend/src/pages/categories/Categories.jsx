import { useState } from 'react';
import { ActionIcon, Button, Group, Paper, Table, Text, Title, LoadingOverlay } from '@mantine/core';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '../../state/categories/api';
import { useDisclosure } from '@mantine/hooks';
import ModalAddEditCategory from './ModalAddEditCategory';

export default function Categories() {
	const [activeCategory, setActiveCategory] = useState(null);

	const { data: categories, isFetching: isFetchingCategories } = useGetCategoriesQuery();

	const [modalCategoryOpened, { open: modalCategoryOpen, close: modalCategoryClose }] = useDisclosure();

	const [deleteCategory, resultDeleteCategory] = useDeleteCategoryMutation();

	const handleCloseModalCategory = () => {
		modalCategoryClose();
		setActiveCategory(null);
	};

	const handleEdit = (category) => () => {
		setActiveCategory(category);
		modalCategoryOpen();
	};

	const handleDelete = (categoryId) => async () => {
		// delete category
		await deleteCategory(categoryId);
	};

	return (
		<div>
			<LoadingOverlay visible={isFetchingCategories || resultDeleteCategory.isLoading} />
			<ModalAddEditCategory opened={modalCategoryOpened} onClose={handleCloseModalCategory} category={activeCategory} />
			<Group mb='md' position='apart'>
				<Title>Categories</Title>
				<Button onClick={modalCategoryOpen} leftIcon={<IconPlus />}>
					Add Category
				</Button>
			</Group>
			<Paper>
				<Table highlightOnHover withBorder>
					<thead>
						<tr>
							<th>Name</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{categories?.map((category) => (
							<tr key={category.id}>
								<td>
									<Text>{category.name}</Text>
								</td>
								<td style={{ width: '100px' }}>
									<Group>
										<ActionIcon onClick={handleEdit(category)}>
											<IconEdit />
										</ActionIcon>
										<ActionIcon onClick={handleDelete(category.id)}>
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
