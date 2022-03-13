/* Ducks 패턴으로 만드는 Counter 모듈 */

/* 액션 타입
 * Ducks 패턴은 액션의 이름에 접두사를 넣는다.
 * 다른 모듈의 액션 이름과 중복되는 것을 방지한다.
 * */
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/* 액션 생성 함수 */
export const setDiff = diff => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* 초기 상태 선언*/
const initialState = {
	number: 0,
	diff: 1,
};

/* Reducer 선언 */
export default function counter(state = initialState, action) {
	switch (action.type) {
		case SET_DIFF:
			return {
				...state,
				diff: action.diff,
			};
		case INCREASE:
			return {
				...state,
				number: state.number + state.diff,
			};
		case DECREASE:
			return {
				...state,
				number: state.number - state.diff,
			};
		default:
			return state;
	}
}
