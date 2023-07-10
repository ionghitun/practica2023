import { useEffect, useState } from 'react';
import Categories from './Categories';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useCreateCategoriesMutation, useGetCategoriesQuery, useDeleteCategoriesMutation } from '../../state/categories/api';

function CategoriesCreate() {
	const [category, setCategory] = useState('');
	const categoriesReq = useGetCategoriesQuery();
	const [addCategory, resultAddCategory] = useCreateCategoriesMutation();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [successMessageVisible, setSuccessMessageVisible] = useState(false);
	const [inputError, setInputError] = useState('');


	const handleAddCategory = async () => {
		if (category.trim() === '' || category.length < 3) {
			setInputError('Category name must be at least 3 characters long');
			return; // Don't proceed if the category name is empty
		}
		try {
			await addCategory({ name: category });
			setIsSubmitted(true);
			setSuccessMessageVisible(true);
			setCategory('');
			setTimeout(() => {
				setSuccessMessageVisible(false);
			}, 3000);
			

		} catch (error) {
			console.error('Error adding category:', error);
		}
	};
	const BackBtn = () => {
		return (
			<div>
				<Link to='http://localhost:3000/categories'>
					<Button color='orange'>Back</Button>
				</Link>
			</div>
		);
	};

	const SuccessMessage = ({ message }) => {
		return isSubmitted && successMessageVisible ? (
			<div style={{ background: 'green', color: 'white', padding: '1rem' }}>{message}</div>
		) : null;
	};

	return (
		<div>
			<p>Introduce category name:</p>
			<input
				placeholder='name'
				required
				pattern=".{3,}"
				title="Category name must be at least 3 characters long"
				value={category}
				onChange={(e) => {
					setCategory(e.target.value);
					setInputError('');

				}}
			/>
			&nbsp;&nbsp;&nbsp;
			<Button onClick={handleAddCategory}>Add</Button>
			<br></br>
			{BackBtn()}
			<br></br>
			<SuccessMessage message="Category added successfully!" />
			{inputError && <div style={{ color: 'red' }}>{inputError}</div>}



		</div>
	);
}

export default CategoriesCreate;
