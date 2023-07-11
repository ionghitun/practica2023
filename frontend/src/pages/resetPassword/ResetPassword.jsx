import { useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { Button, Container, Image, LoadingOverlay, PasswordInput, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useAuth } from '../../hooks/user';
import { useResetPasswordMutation } from '../../state/auth/api';

function ResetPassword() {
	const { user } = useAuth();

	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const hash = searchParams.get('hash');

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [resetPassword, resultResetPassword] = useResetPasswordMutation();

	const onSubmit = async (e) => {
		e.preventDefault();

		const res = await resetPassword({
			password,
			token,
			hash,
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
						Already have an account? Click <Link to='/login'>here</Link> to login
					</Text>
				</Stack>
			</form>
		</Container>
	);
}

export default ResetPassword;
