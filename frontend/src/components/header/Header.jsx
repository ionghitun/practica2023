import { Link } from 'react-router-dom';
import { ActionIcon, Avatar, Burger, Group, Image, Header as MantineHeader, MediaQuery, Menu } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useLogoutMutation } from '../../state/auth/api';
import { useAuth } from '../../hooks/user';
import { useParams } from 'react-router-dom';
import { useGetUserImageQuery } from '../../state/user/api';

function Header({ opened = false, setOpened = null }) {
	const { user } = useAuth();
	const [logout] = useLogoutMutation();
	const { id } = useParams();	

	const logoutUser = async () => {
		await logout();
	};


	const userImageId = user?.id;
	const { data: userImages, isLoading, isError } = useGetUserImageQuery(userImageId);

	
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		
	}

	  // Check if user data is available before accessing the 'id' property
	const userId = user?.id || null;


	return (
		<MantineHeader height={60} py='xs' px='xl'>
			<Group position='apart'>
				<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
					<Burger opened={opened} onClick={() => setOpened((o) => !o)} size='sm' />
				</MediaQuery>
				<div>
					<Link to='/'>
						<Image src='/roweb-logo.svg' height={24} />
					</Link>
				</div>

				{user?.id ? (
					<Group>
						<Group>Hello {user?.name}</Group>
						<Menu shadow='md'>
							<Menu.Target>
							{userImages?.user_images?.length ? (
								<ActionIcon size='xl'>
									<Image src={userImages?.user_images[0]?.image_url} alt={user.name} height={40} radius='xl' />
								</ActionIcon>
								) : (
								// Fallback image in case the user's image is not available
								<ActionIcon size='xl'>
									<Image withPlaceholder alt={user.name} height={40} radius='xl' />
								</ActionIcon>
								)}
							</Menu.Target>
							<Menu.Dropdown>
								<Link to={`/users/${user.id}`}>
									<Menu.Item icon={<IconUser size={14} />}>My Profile</Menu.Item>
								</Link>
								<Menu.Item icon={<IconLogout size={14} />} onClick={logoutUser}>
									Logout
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
				) : (// Show the "Login" button when the user is not connected
				<Link to='/login'>Login</Link>
			  )}
			</Group>
		</MantineHeader>
	);
}

export default Header;
