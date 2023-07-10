import { useEffect, useState } from 'react';
import { useCreateCategoriesMutation, useGetCategoriesQuery, useDeleteCategoriesMutation } from '../../state/categories/api';
import { Button } from '@mantine/core';
import { Table } from '@mantine/core';
import { Link } from 'react-router-dom';
import EditComponent from './CategoriesEdit';
import React from 'react';
import axios from 'axios';

export default function Categories() {
	const [category, setCategory] = useState('');

	const categoriesReq = useGetCategoriesQuery();
	const [addCategory, resultAddCategory] = useCreateCategoriesMutation();
	const [deleteCategory, resultDeleteCategory] = useDeleteCategoriesMutation();
	const [selectedId, setSelectedId] = useState(null);

	const handleAddCategory = () => {
		addCategory({ name: category });
	};

	const handleEdit = (id) => {
		setSelectedId(id);
	  };
	
	  const handleFormSubmit = () => {
		setSelectedId(null);
	  };
	
	const AddBtn = () => {
		return (
		  <div>
			<Link to="/categories/create"><Button color='green'>Create new category</Button></Link>
		  </div>
		);
	  };
		
	const fetchCategories = async () => {
		try {
		  categoriesReq.refetch();
		} catch (error) {
		  console.error('Error fetching categories:', error);
		}
	  };
	
	const handleDelete = async (id) => {
		try {

			await axios.delete(`http://127.0.0.1:8000/api/category/${id}/delete`);
			console.log('Successfully deleted object');

			if (id === selectedId) {
				setSelectedId(null);
			}

			fetchCategories();
		} catch (error) {

			console.error('Error deleting object:', error);
			console.log(id);
		}
	};

	let rows = categoriesReq?.data?.map((category) => (
		<tr key={category.name}>
			<td>{category.name}</td>
			<td><Button color="red" onClick={() => handleDelete(category.id)}>Delete </Button> &nbsp; &nbsp; &nbsp;
			<Button margin-left onClick={() => setSelectedId(category.id)}>Edit</Button></td>
		</tr>
	));

	console.log(categoriesReq);
	
	return (
		<>
			<div>
				<Table striped highlightOnHover withBorder >
					<thead>
						<tr>
							<th>Name</th>
							<th>{AddBtn()}</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
			</div>
			{selectedId && <EditComponent itemId={selectedId} onFormSubmit={handleFormSubmit}/>}			
		</>
	);
}


