import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Container, Image, LoadingOverlay, Stack, Text, TextInput } from '@mantine/core';
import { useAuth } from '../../hooks/user';
import { useLoginMutation } from '../../state/auth/api';

function ForgotPassword() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [email, setEmail] = useState('');
	const [login, resultLogin] = useLoginMutation();

	const onSubmit = async (e) => {
		e.preventDefault();

		const res = await login({
			email,
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
