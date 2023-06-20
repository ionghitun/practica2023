import { useAuth } from '../../../hooks/user';

export default function User() {
	const { user } = useAuth();

	return (
		<div>
			<p>User</p>
			<p>Hello {user.name}</p>
		</div>
	);
}
