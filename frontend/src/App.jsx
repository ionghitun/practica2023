import { Suspense } from 'react';
import { Provider } from 'react-redux';
import Router from './router';
import store from './state/store';

function App() {
	return (
		<Provider store={store}>
			<Suspense fallback={<div>loading...</div>}>
				<Router />
			</Suspense>
		</Provider>
	);
}

export default App;
