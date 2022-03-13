import { useDispatch, useSelector } from 'react-redux';
import { clearCharacter, getCharacter, goHome } from '../modules/characters';
import { useEffect } from 'react';
import Character from '../components/Character';

function CharacterContainer({ id }) {
	const { data, loading, error } = useSelector(
		state => state.characters.character[id],
	) || {
		loading: false,
		data: null,
		error: null,
	}; /* 아예 데이터가 존재하지 않을 때가 있으므로, 비구조화 할당 오류 방지 */
	const dispatch = useDispatch();

	useEffect(() => {
		/* character가 존재하면 요청자체를 하지 않음
		if (data) return;
		 */

		dispatch(getCharacter(id));

		/* 언마운트 될 때 character를 비우게 되므로 다른 character를
		 * 조회할 때 이전 character가 보여지는 문제가 해결 됨
		 *
		return () => {
			dispatch(clearCharacter());
		};
		 */
	}, [id, dispatch]);

	/* 로딩중이며 이전의 데이터가 없는 경우에만 로딩 중 표시 */
	if (loading && !data) return <div>Loading ...</div>;
	if (error) return <div>Error !!!</div>;
	if (!data) return null;

	return (
		<>
			<Character character={data} />
		</>
	);
}

export default CharacterContainer;
