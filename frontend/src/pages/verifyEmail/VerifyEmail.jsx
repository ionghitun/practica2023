import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button, Container, Image, LoadingOverlay, Stack, Text, TextInput } from '@mantine/core';
import { useAuth } from '../../hooks/user';
import { useVerifyEmailMutation } from '../../state/auth/api';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

function VerifyEmail() {
	const { user } = useAuth();

	const [token, setToken] = useState('');
	const [verifyEmail, resultVerifyEmail] = useVerifyEmailMutation();

	const onSubmit = async (e) => {
		e.preventDefault();

		const res = await verifyEmail({
			token,
			hash: '',
		});

		if (!res.error) {
			// error
			notifications.show({
				title: 'Success',
				message: 'Your email has been validated!',
				color: 'green',
				icon: <IconCheck />,
			});
		}
	};

	if (user) {
		return <Navigate to='/dashboard' />;
	}

	return (
		<Container size='400px'>
			<LoadingOverlay visible={resultVerifyEmail.isLoading} />
			<Image src='/roweb-logo.svg' height={50} mt='250px' mb='md' fit='contain' />
			<form onSubmit={onSubmit}>
				<Stack>
					<TextInput placeholder='Token' label='Token' withAsterisk onChange={(e) => setToken(e.target.value)} />
					<Button fullWidth type='submit'>
						Verify
					</Button>
					<Text>
						No account? Click <Link to='/register'>here</Link> to create an account
					</Text>
				</Stack>
			</form>
		</Container>
	);
}

export default VerifyEmail;
