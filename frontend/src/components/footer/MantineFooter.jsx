import { Footer, Container, ActionIcon, Image, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';

function MantineFooter() {
	return (
		<Footer height={60} py='xs' px='xl' mt='md'>
			<Container size='lg'>
				<Group position='apart'>
					<div>
						<Link to='/dashboard'>
							<Image src='/roweb-logo.svg' height={24} />
						</Link>
					</div>
					<Group spacing={0} position='right' noWrap>
						<ActionIcon size='lg'>
							<IconBrandTwitter size='1.30rem' stroke={1.5} />
						</ActionIcon>
						<ActionIcon size='lg'>
							<IconBrandYoutube size='1.30rem' stroke={1.5} />
						</ActionIcon>
						<ActionIcon size='lg'>
							<IconBrandInstagram size='1.30rem' stroke={1.5} />
						</ActionIcon>
					</Group>
				</Group>
			</Container>
		</Footer>
	);
}

export default MantineFooter;
