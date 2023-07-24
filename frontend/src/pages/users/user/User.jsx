import { useAuth } from '../../../hooks/user';
import { Carousel } from '@mantine/carousel';
import { Button, Group, Image, LoadingOverlay, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useGetUserImageQuery } from '../../../state/user/api';

export default function User() {
	const { user } = useAuth();
	const { id } = useParams();
	const { data: userImages, isLoading, isError } = useGetUserImageQuery(id);
	console.log('userImages:', userImages);

	if (isLoading) {
		return <LoadingOverlay visible> Loading...</LoadingOverlay>;
		
	}
	
	if (isError) {
		
	}
	
	return (
		<div>
			<p>Email: {user.email}</p>
			<p>Hello {user.name}</p>
			<p>User avatar:</p>
			<Group my='xl'>
			<Image src={userImages?.user_images[0]?.image_url} withPlaceholder width={200} height={200} radius='lg' />
			</Group>
		</div>
	);
}
