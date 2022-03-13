const myLogger = store => next => action => {
	console.log(action); // 받아온 action을 출력

	const result = next(action); // 다음 미들웨어 (또는 리듀서)에게 action을 전달
	console.log('\t', store.getState()); // 업데이트 이후의 상태 조회

	return result; // dispatch(action) 의 결과물을 반환 기본: undefined
};

export default myLogger;
