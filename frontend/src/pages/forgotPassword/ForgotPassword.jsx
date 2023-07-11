import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button, Container, Image, LoadingOverlay, Stack, Text, TextInput } from '@mantine/core';
import { useAuth } from '../../hooks/user';
import { useForgotPasswordMutation } from '../../state/auth/api';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

function ForgotPassword() {
	const { user } = useAuth();

	const [email, setEmail] = useState('');
	const [forgotPassword, resultForgotPassword] = useForgotPasswordMutation();

	const onSubmit = async (e) => {
		e.preventDefault();

		const res = await forgotPassword({
			email,
		});

		if (!res.error) {
			// error
			notifications.show({
				title: 'Success',
				message: 'An email was sent to your address',
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
			<LoadingOverlay visible={resultForgotPassword.isLoading} />
			<Image src='/roweb-logo.svg' height={50} mt='250px' mb='md' fit='contain' />
			<form onSubmit={onSubmit}>
				<Stack>
					<TextInput placeholder='Email' label='Email' withAsterisk onChange={(e) => setEmail(e.target.value)} />
					<Button fullWidth type='submit'>
						Reset
					</Button>
					<Text>
						No account? Click <Link to='/register'>here</Link> to create an account
					</Text>
				</Stack>
			</form>
		</Container>
	);
}

export default ForgotPassword;
