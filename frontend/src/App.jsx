import { Suspense } from 'react';
import { Provider } from 'react-redux';
import Router from './router';
import store from './state/store';
import { MantineProvider } from '@mantine/core';

function App() {
	return (
		<Provider store={store}>
			<MantineProvider withGlobalStyles withNormalizeCSS>
				<Suspense fallback={<div>loading...</div>}>
					<Router />
				</Suspense>
			</MantineProvider>
		</Provider>
	);
}

export default App;
