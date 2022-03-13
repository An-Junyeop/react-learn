import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase, setDiff } from '../modules/counter';
import Counter from '../components/Counter';

/* 프리젠테이셔널 컴포넌트와 컨테이너 컴포넌트를 구분하는 패턴
 * 컨테이너 컴포넌트
 * */
function CounterContainer() {
	/* useSelector => Redux Store의 state 조회 (getState()와 같은 결과) */
	const diff = useSelector(state => state.counter.diff);
	const number = useSelector(state => state.counter.number);

	/* 이 방식으로 할 경우 useSelector를 통해 매번 렌더링 될 때마다 새로운
	 * 객체를 만들기 때문에 상태의 변화 유무를 체크할 수 없어 렌더링 낭비가 발생 */
	/*const { diff, number } = useSelector(state => ({
		diff: state.counter.diff,
		number: state.counter.number,
	}));*/

	/*
	shallowEqual을 useSelector의 두번째 인자로 전달
	const { diff, number } = useSelector(state => ({
		diff: state.counter.diff,
		number: state.counter.number,
	}, shallowEqual));
	*/

	/* useDispatch => Redux Store의 dispatch를 함수에서 사용할 수 있게 해줌 */
	const dispatch = useDispatch();
	const onIncrease = () => dispatch(increase());
	const onDecrease = () => dispatch(decrease());
	const onSetDiff = diff => dispatch(setDiff(diff));

	return (
		<Counter
			number={number}
			diff={diff}
			onIncrease={onIncrease}
			onDecrease={onDecrease}
			onSetDiff={onSetDiff}
		/>
	);
}

export default CounterContainer;
