import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/user';

export function PrivateRoute() {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to='/login' />;
	}

	return <Outlet />;
}
