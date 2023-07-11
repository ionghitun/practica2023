import { useEffect, useRef } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { Container, Image, LoadingOverlay, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useVerifyEmailMutation } from '../../state/auth/api';
import { useAuth } from '../../hooks/user';

function VerifyEmail() {
	const { user } = useAuth();
	const effect = useRef(false);

	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const hash = searchParams.get('hash');

	const [verifyEmail, resultVerifyEmail] = useVerifyEmailMutation();

	useEffect(() => {
		if (token && hash && effect.current === false) {
			const handleEmailVerify = async () => {
				const res = await verifyEmail({
					token,
					hash,
				});

				if (!res.error) {
					// error
					notifications.show({
						title: 'Success',
						message: 'Your email has been validated!',
						color: 'green',
						icon: <IconCheck />,
					});
				}
			};
			handleEmailVerify();
		}

		return () => {
			effect.current = true;
		};
	}, [token, hash, verifyEmail]);

	if (user) {
		return <Navigate to='/dashboard' />;
	}

	return (
		<Container size='400px'>
			<LoadingOverlay visible={resultVerifyEmail.isLoading} />
			<Image src='/roweb-logo.svg' height={50} mt='250px' mb='md' fit='contain' />
			<Text>
				Already have an account? Click <Link to='/login'>here</Link> to login
			</Text>
		</Container>
	);
}

export default VerifyEmail;
