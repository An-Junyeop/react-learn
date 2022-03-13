import { useEffect, useReducer } from 'react';

function reducer(state, action) {
	switch (action.type) {
		case 'LOADING':
			return {
				loading: true,
				data: null,
				error: null,
			};
		case 'SUCCESS':
			return {
				loading: false,
				data: action.data,
				error: null,
			};
		case 'ERROR':
			return {
				loading: false,
				data: null,
				error: action.error,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

/*
 * callback => API요청을 시작하는 함수
 * deps => 함수 내에서 사용하는 useEffect의 deps
 *      => 비동기 함수에서 사용할 파라미터
 *      => 파라미터가 수정될 떄 마다 새로운 데이터를 호출하고 싶을 때 활용
 * */
function useAsync(callback, deps = []) {
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		data: null,
		error: null,
	});

	const fetchData = async () => {
		dispatch({ type: 'LOADING' });
		try {
			const data = await callback();
			dispatch({ type: 'SUCCESS', data });
		} catch (e) {
			dispatch({ type: 'ERROR', error: e });
		}
	};

	useEffect(() => {
		fetchData();
	}, deps);

	return [state, fetchData];
}

export default useAsync;
