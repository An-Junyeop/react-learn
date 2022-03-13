import Home from './Components/Home';
import About from './Components/About';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Profiles from './Components/Profiles';
import HistorySample from './Components/HistorySample';
import Profile from './Components/Profile';
import Layout from './Components/Layout';

function App() {
	return (
		<div>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/About' element={<About />} />
					<Route path='/profiles/*' element={<Profiles />}>
						<Route
							index
							element={<div>클래스를 선택해주세요.</div>}
						/>
						<Route path=':classname' element={<Profile />} />
					</Route>
					<Route path='/history' element={<HistorySample />} />
					<Route path='*' element={<div>Not Found</div>} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
