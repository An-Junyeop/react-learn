/* 서브 리듀서 (counter) */
/* 액션 타입 */
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

/* 액션 생성 함수*/
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

export const increaseAsync = () => (dispatch, state) => {
	setTimeout(() => dispatch(increase()), 1000);
};
export const decreaseAsync = () => (dispatch, state) => {
	setTimeout(() => dispatch(decrease()), 1000);
};
/* 초기 값 */
const initialState = 0;

export default function counter(state = initialState, action) {
	switch (action.type) {
		case INCREASE:
			return state + 1;
		case DECREASE:
			return state - 1;
		default:
			return state;
	}
}
