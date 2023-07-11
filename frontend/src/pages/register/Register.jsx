import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Container, Image, LoadingOverlay, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useAuth } from '../../hooks/user';
import { useLoginMutation } from '../../state/auth/api';

function Register() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
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
					<TextInput placeholder='Name' label='Name' withAsterisk value={name} onChange={(e) => setName(e.target.value)} />
					<TextInput placeholder='Email' label='Email' withAsterisk value={email} onChange={(e) => setEmail(e.target.value)} />
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
						Register
					</Button>
					<Text>
						Already have an account? Click <Link to='/login'>here</Link> to login
					</Text>
				</Stack>
			</form>
		</Container>
	);
}

export default Register;
