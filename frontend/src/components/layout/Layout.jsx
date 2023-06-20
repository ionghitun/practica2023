import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Box } from '@mantine/core';
import Header from '../header';
import Navbar from '../navbar';

function Layout() {
	const [opened, setOpened] = useState(false);

	return (
		<AppShell
			padding='md'
			navbarOffsetBreakpoint='sm'
			asideOffsetBreakpoint='sm'
			navbar={<Navbar opened={opened} setOpened={setOpened} />}
			header={<Header opened={opened} setOpened={setOpened} />}
			styles={(theme) => ({
				main: {
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			})}
		>
			<Box>
				<Outlet />
			</Box>
		</AppShell>
	);
}

export default Layout;
