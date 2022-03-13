import Movies from './components/Movies';
import { MoviesProvider } from './components/MoviesContext';

function App() {
	return (
		<MoviesProvider>
			<Movies>Hello</Movies>
		</MoviesProvider>
	);
}

export default App;
