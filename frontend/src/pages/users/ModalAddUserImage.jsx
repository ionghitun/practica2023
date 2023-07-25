import { useUploadAvatarMutation } from '../../state/user/api';
import React, { useEffect, useState } from 'react';
import { Button, Group, Modal, LoadingOverlay, FileInput } from '@mantine/core';

export default function ModalAddUserImage({ opened = false, onClose = null, user = null }) {
	const [addImage, resultAddImage] = useUploadAvatarMutation();
	const [userImage, setUserImage] = useState(null);

	const handleClose = () => {
		onClose();
		setUserImage([]);
	};

	useEffect(() => {
		if (user) {
			setUserImage(user.avatar);
		}
	}, [user]);

	const onSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('avatar', userImage);

		const result = await addImage({ data: formData, id: user.id });

		if (!result.error) {
			handleClose();
		}
	};

	return (
		<>
			<LoadingOverlay visible={resultAddImage.isLoading} />
			<Modal opened={opened} title='Set profile image'>
				<form onSubmit={onSubmit}>
					<FileInput
						placeholder='Pick file'
						label='Choose file'
						radius='md'
						withAsterisk
						type='file'
						id='image'
						name='image'
						value={userImage}
						onChange={(e) => {
							setUserImage(e);
						}}
					/>

					<Group position='right' mt='lg'>
						<Button variant='outline' onClick={handleClose}>
							Close
						</Button>
						<Button type='submit'>Add</Button>
					</Group>
				</form>
			</Modal>
		</>
	);
}
