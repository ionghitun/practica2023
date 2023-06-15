import { Link } from 'react-router-dom';
import {
	ActionIcon,
	Avatar,
	Burger,
	Group,
	Header as MantineHeader,
	Image,
	MediaQuery,
	Menu,
	Switch,
	Text,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { IconLogout, IconMoonStars, IconSun, IconUser } from '@tabler/icons-react';
import { useLogoutMutation } from '../../state/auth/api';
import { useAuth } from '../../hooks/user';
import { getFile } from '../../utils/general.utils';

function Header({ opened, setOpened }) {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();
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
				<div className={classes.logo}>
					<Link to='/'>
						<Image src={colorScheme === 'light' ? '/logoBlack.png' : '/logo.png'} width={150} />
					</Link>
				</div>
				<Group>
					<MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
						<Group>
							<Switch
								checked={colorScheme === 'dark'}
								onChange={() => toggleColorScheme()}
								size='lg'
								onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
								offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
							/>
						</Group>
					</MediaQuery>
					<Menu shadow='md'>
						<Menu.Target>
							<ActionIcon size='xl'>
								<Avatar radius='xl' src={getFile(user.avatar)} />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
								<Menu.Item>
									<Group>
										<Switch
											checked={colorScheme === 'dark'}
											onChange={() => toggleColorScheme()}
											size='lg'
											onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
											offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
										/>
										<Text>Mod întunecat</Text>
									</Group>
								</Menu.Item>
							</MediaQuery>
							<Link to={`/users/${user.id}`}>
								<Menu.Item icon={<IconUser size={14} />}>Profilul meu</Menu.Item>
							</Link>
							<Menu.Item icon={<IconLogout size={14} />} onClick={logoutUser}>
								Deloghează-mă
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Group>
		</MantineHeader>
	);
}

export default Header;
