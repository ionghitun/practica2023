import { NavLink } from 'react-router-dom';
import { createStyles, getStylesRef, rem, Navbar as MantineNav } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
	header: {
		paddingBottom: theme.spacing.md,
		marginBottom: `calc(${theme.spacing.md} * 1.5)`,
		borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
	},

	footer: {
		paddingTop: theme.spacing.md,
		marginTop: theme.spacing.md,
		borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
	},

	link: {
		...theme.fn.focusStyles(),
		display: 'flex',
		alignItems: 'center',
		textDecoration: 'none',
		fontSize: theme.fontSizes.sm,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
		padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
		borderRadius: theme.radius.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,

			[`& .${getStylesRef('icon')}`]: {
				color: theme.colorScheme === 'dark' ? theme.white : theme.black,
			},
		},
	},

	linkIcon: {
		ref: getStylesRef('icon'),
		color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
		marginRight: theme.spacing.sm,
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
			[`& .${getStylesRef('icon')}`]: {
				color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
			},
		},
	},
}));

const data = [{ link: '/dashboard', label: 'Home', icon: IconHome }];

function Navbar({ opened = false, setOpened = null }) {
	const { classes, cx } = useStyles();

	const links = data.map((link) => {
		return (
			<NavLink
				className={({ isActive }) => cx(classes.link, { [classes.linkActive]: isActive })}
				to={link.link}
				key={link.label}
				onClick={() => setOpened(false)}
			>
				<link.icon stroke={1.5} />
				<span>{link.label}</span>
			</NavLink>
		);
	});

	return (
		<MantineNav width={{ sm: 200, lg: 200, xl: 200 }} p='md' hiddenBreakpoint='sm' hidden={!opened}>
			<MantineNav.Section grow>{links}</MantineNav.Section>
		</MantineNav>
	);
}

export default Navbar;
