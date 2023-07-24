import { useAuth } from '../../../hooks/user';

export default function User() {
	const { user } = useAuth();
	const { userEmail } = useAuth();

	return (
		<div>
			<p>User</p>
			<p>Hello {user.name}</p>
			<p>Email: {userEmail}</p>
		</div>
	);
}
