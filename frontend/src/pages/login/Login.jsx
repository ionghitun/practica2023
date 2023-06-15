import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useAuth } from '../../hooks/user';
import { useLoginMutation } from '../../state/auth/api';

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
		<div>
			<TextInput placeholder='Email' label='Email' withAsterisk onChange={(e) => setEmail(e.target.value)} />
			<PasswordInput placeholder='Password' label='Password' withAsterisk onChange={(e) => setPassword(e.target.value)} />
			<Button fullWidth mt='md' onClick={onSubmit}>
				Login
			</Button>
		</div>
	);
}

export default Login;
