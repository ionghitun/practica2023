import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Container, Image, LoadingOverlay, Stack, Text, TextInput } from '@mantine/core';
import { useAuth } from '../../hooks/user';
import { useLoginMutation } from '../../state/auth/api';

function VerifyEmail() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [token, setToken] = useState('');
	const [login, resultLogin] = useLoginMutation();

	const onSubmit = async (e) => {
		e.preventDefault();

		const res = await login({
			token,
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
