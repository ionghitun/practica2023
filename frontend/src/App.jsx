import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Router from './router';
import store from './state/store';

function App() {
	return (
		<Provider store={store}>
			<MantineProvider withGlobalStyles withNormalizeCSS>
				<Notifications />
				<Suspense fallback={<div>loading...</div>}>
					<Router />
				</Suspense>
			</MantineProvider>
		</Provider>
	);
}

export default App;
