import { useState, useEffect } from 'react';
import { Button, Group, Modal, TextInput, LoadingOverlay } from '@mantine/core';
import { useCreateCategoriesMutation, useUpdateCategoryMutation } from '../../state/categories/api';

export default function ModalAddEditCategory({ opened = false, onClose = null, category = null }) {
	const [categoryName, setCategoryName] = useState('');

	const [addCategory, resultAddCategory] = useCreateCategoriesMutation();
	const [updateCategory, resultUpdateCategory] = useUpdateCategoryMutation();

	useEffect(() => {
		if (category?.name) {
			setCategoryName(category.name);
		}
	}, [category?.name]);

	const handleClose = () => {
		onClose();
		setCategoryName('');
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const result = category ? await updateCategory({ name: categoryName, id: category.id }) : await addCategory({ name: categoryName });

		if (!result.error) {
			handleClose();
		}
	};

	return (
		<Modal opened={opened} onClose={handleClose} title={category ? 'Edit Category' : 'Add Category'}>
			<LoadingOverlay visible={resultAddCategory.isLoading || resultUpdateCategory.isLoading} />
			<form onSubmit={onSubmit}>
				<TextInput
					label='Category'
					placeholder='Name'
					value={categoryName}
					onChange={(e) => setCategoryName(e.target.value)}
				></TextInput>
				<Group position='right' mt='lg'>
					<Button variant='outline' onClick={handleClose}>
						Close
					</Button>
					<Button type='submit'>Save</Button>
				</Group>
			</form>
		</Modal>
	);
}
