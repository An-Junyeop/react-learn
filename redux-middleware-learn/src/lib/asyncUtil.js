/* Promise에 기반한 Thunk 생성함수 */
export const createPromiseThunk = (type, promiseCreator) => {
	const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

	/* 한 개의 파라미터만 받는 조건
	 * 여러 개의 파라미터를 받아야 한다면 객체 타입의 파라미터를 받아오도록 수정
	 * */
	return param => async dispatch => {
		dispatch({ type, param });

		try {
			const payload = await promiseCreator(param);
			dispatch({ type: SUCCESS, payload });
		} catch (e) {
			dispatch({ type: ERROR, payload: e, error: true });
		}
	};
};

/* 특정 id를 처리하는 Thunk 생성함수*/
const defaultIdSelector = param => param;
export const createPromiseThunkById = (
	type,
	promiseCreator,
	/* 파라미터에서 id를 어떻게 선택 할 지 정의하는 함수
	 * 기본 값으로 파라미터를 그대로 id로 사용
	 * 하지만 파라미터가 {id : 1, details: true} 와 같은 형태라면
	 * idSelector를 param => param.id 와 같은 식으로 커스텀이 가능
	 * */
	idSelector = defaultIdSelector,
) => {
	const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

	return param => async dispatch => {
		const id = idSelector(param);
		dispatch({ type, meta: id });

		try {
			const payload = await promiseCreator(param);
			dispatch({ type: SUCCESS, payload, meta: id });
		} catch (e) {
			dispatch({ type: ERROR, payload: e, error: true, meta: id });
		}
	};
};

/* Reducer에서 사용 할 유틸 함수들 */
export const reducerUtils = {
	/* 상태 초기화 */
	initial: (initialData = null) => ({
		loading: false,
		data: initialData,
		error: null,
	}),

	/* 로딩중 상태
	 * prevState에 값을 입력하여 null이 아닌 값으로 유지시킬 수 있다.
	 * */
	loading: (prevState = null) => ({
		loading: true,
		data: prevState,
		error: null,
	}),

	/* 성공 상태 */
	success: payload => ({
		loading: false,
		data: payload,
		error: null,
	}),

	/* 실패 상태 */
	error: error => ({
		loading: false,
		data: null,
		error: error,
	}),
};

/* 비동기 관련액션들을 처리하는 리듀서
 * keepData를 통해 기존의 데이터가 있는 경우 이를 유지하며 새로운 데이터를 호출함
 * */
export const handleAsyncActions = (type, key, keepData = false) => {
	const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

	return (state, action) => {
		switch (action.type) {
			case type:
				return {
					...state,
					[key]: reducerUtils.loading(
						keepData ? state[key].data : null,
					),
				};
			case SUCCESS:
				return {
					...state,
					[key]: reducerUtils.success(action.payload),
				};
			case ERROR:
				return {
					...state,
					[key]: reducerUtils.error(action.payload),
				};
			default:
				return state;
		}
	};
};

/* 특정 id를 처리하는 리듀서 */
export const handleAsyncActionsById = (type, key, keepData = false) => {
	const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

	return (state, action) => {
		const id = action.meta;

		switch (action.type) {
			case type:
				return {
					...state,
					[key]: {
						...state[key],
						[id]: reducerUtils.loading(
							// state[key][id]가 만들어져 있지 않는 경우를 대비하여 유효성 검사 후 data 조회
							keepData
								? state[key][id] && state[key][id].data
								: null,
						),
					},
				};
			case SUCCESS:
				return {
					...state,
					[key]: {
						...state[key],
						[id]: reducerUtils.success(action.payload),
					},
				};
			case ERROR:
				return {
					...state,
					[key]: {
						...state[key],
						id: reducerUtils.error(action.payload),
					},
				};
			default:
				return state;
		}
	};
};
