import { useParams } from 'react-router-dom';
import CharacterContainer from '../containers/CharacterContainer';

function CharacterPage() {
	const { id } = useParams();
	return <CharacterContainer id={parseInt(id, 10)} />;
}

export default CharacterPage;
