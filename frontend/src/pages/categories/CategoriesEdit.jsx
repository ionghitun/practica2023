import React, { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '../../state/categories/api';
import axios from 'axios';
import { Button } from '@mantine/core';


const EditComponent = ({ itemId, onFormSubmit }) => {
	const categoriesReq = useGetCategoriesQuery();
	const [name, setName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(true);

	useEffect(() => {
		fetchData();
	}, [itemId]);

	const fetchData = async () => {
		try {
			await categoriesReq.refetch();
			const category = categoriesReq.data.find((category) => category.id === itemId);
			if (category) {
				setName(category.name);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const handleInputChange = (e) => {
		setName(e.target.value);
	};

	const fetchCategories = async () => {
		try {
		  categoriesReq.refetch();
		} catch (error) {
		  console.error('Error fetching categories:', error);
		}
	  };


	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.put(`http://127.0.0.1:8000/api/category/${itemId}/edit`, { name });
			console.log('Item updated successfully:', response.data);
            fetchCategories();	
            setIsSubmitted(true);

            setTimeout(() => {
                setIsSubmitted(false);
                onFormSubmit();
              }, 7000);
            
            setIsFormVisible(false);

		} catch (error) {
			console.error('Error updating item:', error);			
		}
	};

	return (
		<div>
             {isSubmitted ? (
                <h2>Item Updated Successfully!</h2>
            ) : (
                isFormVisible && (
                    <div>
                        <h2>Edit Item</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name: 
                                <input type='text' value={name} onChange={handleInputChange} />
                            </label>&nbsp;
                            <Button type='submit'>Save Changes</Button>
                        </form>
                    </div>
                )
            )}
		</div>
	);
};

export default EditComponent;
