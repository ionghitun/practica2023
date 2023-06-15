import { BrowserRouter } from 'react-router-dom';
import Auth from '../components/auth/Auth';
import Routes from './Routes';

function Router() {
	return (
		<BrowserRouter>
			<Auth>
				<Routes />
			</Auth>
		</BrowserRouter>
	);
}

export default Router;
