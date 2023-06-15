import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/user';

export default function Home() {
	const { user } = useAuth();

	return (
		<div>
			<p>Home</p>
			{!user?.email && <Link to='/login'>login</Link>}
		</div>
	);
}
