import { Outlet } from 'react-router-dom';

function Character({ character }) {
	return (
		<>
			<Outlet />
			<div>
				<h1>{character.name}</h1>
				<img src={character.img} alt={character.name} />
			</div>
		</>
	);
}

export default Character;
