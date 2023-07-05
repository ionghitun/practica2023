import { useState } from 'react';
import { useCreateCategoriesMutation, useGetCategoriesQuery } from '../../state/categories/api';
import { Button } from '@mantine/core';

export default function Categories() {
	const [category, setCategory] = useState('');

	const categoriesReq = useGetCategoriesQuery();
	const [addCategory, resultAddCategory] = useCreateCategoriesMutation();

	const handleAddCategory = () => {
		addCategory({ name: category });
	};

	console.log(categoriesReq);

	return (
		<div>
			<div>
				<input
					placeholder='category'
					onChange={(e) => {
						setCategory(e.target.value);
					}}
				/>
			</div>
			<Button onClick={handleAddCategory}>Add</Button>
			<p>Category is:{category}</p>
			<p>Categories</p>
			{categoriesReq?.data?.map((category) => (
				<p>{category.name}</p>
			))}
		</div>
	);
}
