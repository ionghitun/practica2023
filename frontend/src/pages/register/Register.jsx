import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Container, Image, LoadingOverlay, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useAuth } from '../../hooks/user';
import { useRegisterMutation } from '../../state/auth/api';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconExclamationCircle } from '@tabler/icons-react';

function Register() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [register, resultRegister] = useRegisterMutation();

	const onSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return notifications.show({
				title: 'Error',
				message: "Passwords don't match",
				color: 'green',
				icon: <IconExclamationCircle />,
			});
		}

		const res = await register({
			name,
			email,
			password,
		});

		if (!res.error) {
			// error
			notifications.show({
				title: 'Success',
				message: 'An email was sent to your address',
				color: 'green',
				icon: <IconCheck />,
			});

			navigate('/dashboard');
		}
	};

	if (user) {
		return <Navigate to='/dashboard' />;
	}

	return (
		<Container size='400px'>
			<LoadingOverlay visible={resultRegister.isLoading} />
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
