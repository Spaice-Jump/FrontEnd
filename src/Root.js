import { RouterProvider as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

export default function Root({ store, router }) {
	return (
		<Provider store={store}>
			<Router router={router} />
		</Provider>
	);
}
