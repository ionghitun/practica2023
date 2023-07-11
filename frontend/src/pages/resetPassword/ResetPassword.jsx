import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Container, Image, LoadingOverlay, PasswordInput, Stack, Text } from '@mantine/core';
import { useAuth } from '../../hooks/user';
import { useLoginMutation } from '../../state/auth/api';

function ResetPassword() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [login, resultLogin] = useLoginMutation();

	const onSubmit = async (e) => {
		e.preventDefault();

		const res = await login({
			password,
		}).unwrap();

		if (res.errorMessage) {
			// error
			return null;
		}

		return navigate('/dashboard');
	};

	if (user) {
		return <Navigate to='/dashboard' />;
	}

	return (
		<Container size='400px'>
			<LoadingOverlay visible={resultLogin.isLoading} />
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
