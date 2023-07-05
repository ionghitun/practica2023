import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Container, Image, LoadingOverlay, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useAuth } from '../../hooks/user';
import { useLoginMutation } from '../../state/auth/api';

export const InputRoweb = (props) => {
	return (
		<div>
			<p>Email</p>
			<input placeholder={props.placeholder} />
		</div>
	);
};

function Login() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [login, resultLogin] = useLoginMutation();

	const onSubmit = async () => {
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
			<Stack>
				<Image src='/roweb-logo.svg' height={50} mt='250px' fit='contain' />
				<TextInput placeholder='Email' label='Email' withAsterisk onChange={(e) => setEmail(e.target.value)} />
				<PasswordInput placeholder='Password' label='Password' withAsterisk onChange={(e) => setPassword(e.target.value)} />
				<Button fullWidth onClick={onSubmit}>
					Login
				</Button>
			</Stack>
		</Container>
	);
}

export default Login;
