import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCharacters } from '../modules/characters';
import CharacterList from '../components/CharacterList';

function CharacterListContainer() {
	const { data, loading, error } = useSelector(
		state => state.characters.characters,
	);
	const dispatch = useDispatch();

	/* 데이터가 이미 존재할 경우 요청을 하지 않는 방법
	*
	useEffect(() => {
		if (data) return;
		dispatch(getCharacters());
	}, [data, dispatch]);
	*/
	useEffect(() => {
		dispatch(getCharacters());
	}, [dispatch]);

	if (loading && !data) return <div>Loading ...</div>;
	if (error) return <div>Error !!!</div>;
	if (!data) return null;

	return <CharacterList characters={data} />;
}

export default CharacterListContainer;
