import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import Home from '../pages/home';
import Layout from '../components/layout';
import NotFound from '../pages/notFound';
import { PrivateRoute } from '../components/auth/PrivateRoute';
import Users from '../pages/users';
import User from '../pages/users/user';
import Dashboard from '../pages/dashboard';
import Categories from '../pages/categories';

export default function AppRoutes() {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route element={<PrivateRoute />}>
				<Route path='/' element={<Layout />}>
					{/*Authenticated Routes */}
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='categories' element={<Categories />} />
					<Route path='users'>
						<Route index element={<Users />} />
						<Route path=':id'>
							<Route index element={<User />} />
						</Route>
					</Route>
				</Route>
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}
