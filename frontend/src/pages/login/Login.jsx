import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Container, Image, LoadingOverlay, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useAuth } from '../../hooks/user';
import { useLoginMutation } from '../../state/auth/api';

function Login() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [login, resultLogin] = useLoginMutation();

	const onSubmit = async (e) => {
		e.preventDefault();

		const res = await login({
			email,
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
					<TextInput placeholder='Email' label='Email' withAsterisk onChange={(e) => setEmail(e.target.value)} />
					<PasswordInput placeholder='Password' label='Password' withAsterisk onChange={(e) => setPassword(e.target.value)} />
					<Button fullWidth type='submit'>
						Login
					</Button>
					<Text>
						No account? Click <Link to='/register'>here</Link> to create an account
					</Text>
					<Text>
						Forgot your password? Click <Link to='/forgot-password'>here</Link> to reset
					</Text>
				</Stack>
			</form>
		</Container>
	);
}

export default Login;
