import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button, Container, Image, LoadingOverlay, PasswordInput, Stack, Text } from '@mantine/core';
import { useAuth } from '../../hooks/user';
import { useResetPasswordMutation } from '../../state/auth/api';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

function ResetPassword() {
	const { user } = useAuth();

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [resetPassword, resultResetPassword] = useResetPasswordMutation();

	const onSubmit = async (e) => {
		e.preventDefault();

		const res = await resetPassword({
			password,
			token: '',
			hash: '',
		});

		if (!res.error) {
			notifications.show({
				title: 'Success',
				message: 'Password changed',
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
			<LoadingOverlay visible={resultResetPassword.isLoading} />
			<Image src='/roweb-logo.svg' height={50} mt='250px' mb='md' fit='contain' />
			<form onSubmit={onSubmit}>
				<Stack>
					<PasswordInput
						placeholder='Password'
						label='Password'
						withAsterisk
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<PasswordInput
						placeholder='Confirm Password'
						label='Confirm Password'
						withAsterisk
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
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

export default ResetPassword;
