import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function CharacterList({ characters }) {
	return (
		<>
			<ul>
				{characters.map(character => (
					<li key={character.id}>
						<Link to={`/${character.id}`}>{character.name}</Link>
					</li>
				))}
			</ul>
			<Outlet />
		</>
	);
}

export default CharacterList;
