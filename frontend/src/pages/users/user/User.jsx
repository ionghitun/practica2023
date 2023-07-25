import { Avatar, Button, LoadingOverlay, Flex, Paper, Group } from '@mantine/core';
import { useAuth } from '../../../hooks/user';
import { useDisclosure } from '@mantine/hooks';
import ModalAddUserImage from '../ModalAddUserImage';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useDeleteAccountMutation } from '../../../state/user/api';
import { useLogoutMutation } from '../../../state/auth/api';

export default function User() {
	const { user } = useAuth();
	const imageUrl = import.meta.env.VITE_API_IMAGE_URL;
	const navigate = useNavigate();

	const [logout] = useLogoutMutation();

	const [modalAddImageOpened, { open: modalAddImageOpen, close: modalAddImageClose }] = useDisclosure();
	const [deleteUser, resultDeleteUser] = useDeleteAccountMutation();

	const handleCloseModalImage = () => {
		modalAddImageClose();
	};

	const handleDeleteUser = (id) => () => {
		notifications.show({
			title: 'Are you sure you want to delete?',
			autoClose: false,
			message: (
				<div>
					<Group mt='xl'>
						<Button variant='outline' onClick={() => notifications.clean()}>
							No
						</Button>
						<Button
							onClick={() => {
								deleteUser(id);
								notifications.clean();
								logout();
								navigate('/login');
							}}
						>
							Yes
						</Button>
					</Group>
				</div>
			),
		});
	};

	return (
		<div>
			<h2 align='center'>Profile</h2>
			<ModalAddUserImage opened={modalAddImageOpened} onClose={handleCloseModalImage} user={user} />
			<LoadingOverlay visible={resultDeleteUser.isLoading} />
			<Flex mih={50} gap='lg' justify='center' align='center' direction='row' wrap='wrap'>
				<div onClick={modalAddImageOpen}>
					<Avatar src={imageUrl + user.avatar} radius='xl' size='xl' variant='light' />
				</div>
				<Paper p='lg' radius='lg' shadow='md'>
					<h3>{user.name}</h3>
					<p>Email: {user.email}</p>
					<Button variant='outline' color='blue' fullWidth onClick={handleDeleteUser(user.id)}>
						Delete Account
					</Button>
				</Paper>
			</Flex>
		</div>
	);
}
