/* 프로미스(promise)를 다루는 리덕스(redux) 모듈(module)의 고려사항
 * 프로미스가 시작, 성공, 실패했을 때 각각 다른 액션(action)을 디스패치(dispatch)해야 한다.
 * 각 프로미스마다 thunk 함수를 만들어주어야 한다.
 * 리듀서(reducer)에서 액션에 따른 '로딩 중', '결과', '에러' 상태(state)를 변경해주어야 한다.
 * */
import * as charactersAPI from '../api/characters';
import {
	createPromiseThunk,
	createPromiseThunkById,
	handleAsyncActions,
	handleAsyncActionsById,
	reducerUtils,
} from '../lib/asyncUtil';
import { useNavigate } from 'react-router-dom';

/* 액션 타입 */
const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';

const GET_CHARACTER = 'GET_CHARACTER';
const GET_CHARACTER_SUCCESS = 'GET_CHARACTER_SUCCESS';
const GET_CHARACTER_ERROR = 'GET_CHARACTER_ERROR';
/* 특정 캐릭터 조회 시 재로딩 문제 해결을 위한 액션
 * 컴포넌트가 언마운트될 때 내용을 비움
 * */
const CLEAR_CHARACTER = 'CLEAR_CHARACTER';

/* thunk를 사용할 때, 꼭 모든 액션들에 대한 생성함수를 만들 필요는 없다.
 * 리팩토링 전
export const getCharacters = () => async dispatch => {
	dispatch({ type: GET_CHARACTERS });

	try {
		const characters = await charactersAPI.getCharacters();
		dispatch({ type: GET_CHARACTERS_SUCCESS, characters });
	} catch (e) {
		dispatch({ type: GET_CHARACTERS_ERROR, error: e });
	}
};

export const getCharacter = id => async dispatch => {
	dispatch({ type: GET_CHARACTER });

	try {
		const character = await charactersAPI.getCharacterById(id);
		dispatch({ type: GET_CHARACTER_SUCCESS, character });
	} catch (e) {
		dispatch({ type: GET_CHARACTER_ERROR, error: e });
	}
};
*/
/* asyncUtils를 이용한 리팩토링 후 */
export const getCharacters = createPromiseThunk(
	GET_CHARACTERS,
	charactersAPI.getCharacters,
);
export const getCharacter = createPromiseThunkById(
	GET_CHARACTER,
	charactersAPI.getCharacterById,
);
export const clearCharacter = () => ({ type: CLEAR_CHARACTER });

const initialState = {
	characters: reducerUtils.initial(),
	character: {},
};

export default function characters(state = initialState, action) {
	switch (action.type) {
		case GET_CHARACTERS:
		case GET_CHARACTERS_SUCCESS:
		case GET_CHARACTERS_ERROR:
			return handleAsyncActions(
				GET_CHARACTERS,
				'characters',
				true,
			)(state, action);
		case GET_CHARACTER:
		case GET_CHARACTER_SUCCESS:
		case GET_CHARACTER_ERROR:
			return handleAsyncActionsById(
				GET_CHARACTER,
				'character',
				true,
			)(state, action);
		/* 컴포넌트가 언마운트 될 때 character를 비우기 위한 case.
		case CLEAR_CHARACTER:
			return {
				...state,
				character: reducerUtils.initial(),
			};
			*/
		default:
			return state;
	}
}
