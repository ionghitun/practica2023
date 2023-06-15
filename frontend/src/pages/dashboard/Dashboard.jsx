import { useAuth } from '../../hooks/user';

export default function Dashboard() {
	const { user } = useAuth();
	console.log(312, user);
	return (
		<div>
			<p>Dashboard</p>
			<p>Hello {user.name}</p>
		</div>
	);
}
