import { Link } from 'react-router-dom';
import { ActionIcon, Avatar, Burger, Group, Image, Header as MantineHeader, MediaQuery, Menu } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useLogoutMutation } from '../../state/auth/api';
import { useAuth } from '../../hooks/user';

function Header({ opened = false, setOpened = null }) {
	const { user } = useAuth();
	const [logout] = useLogoutMutation();

	const logoutUser = async () => {
		await logout();
	};

	return (
		<MantineHeader height={60} py='xs' px='xl'>
			<Group position='apart'>
				<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
					<Burger opened={opened} onClick={() => setOpened((o) => !o)} size='sm' />
				</MediaQuery>
				<div>
					<Link to='/dashboard'>
						<Image src='/roweb-logo.svg' height={24} />
					</Link>
				</div>
				<Group>
					<Menu shadow='md'>
						<Menu.Target>
							<ActionIcon size='xl'>
								<Avatar radius='xl' />
							</ActionIcon>
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
			</Group>
		</MantineHeader>
	);
}

export default Header;
