import { Routes, Route } from 'react-router-dom';
import CharacterListPage from './pages/CharacterListPage';
import CharacterPage from './pages/CharacterPage';

function App() {
	return (
		<Routes>
			<Route path='/' element={<CharacterListPage />} />
			<Route path=':id' element={<CharacterPage />} />
		</Routes>
	);
}

export default App;
