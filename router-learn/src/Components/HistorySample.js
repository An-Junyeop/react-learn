import { useNavigate } from 'react-router-dom';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { useCallback, useContext, useEffect } from 'react';

function useBlocker(blocker, when = true) {
	const { navigator } = useContext(NavigationContext);

	useEffect(() => {
		if (!when) return;

		const unblock = navigator.block(tx => {
			const autoUnblockingTx = {
				...tx,
				retry() {
					unblock();
					tx.retry();
				},
			};
			blocker(autoUnblockingTx);
		});
		return unblock;
	}, [navigator, blocker, when]);
}

export function usePrompt(message, when = true) {
	const blocker = useCallback(
		tx => {
			//   eslint-disable-next-line no-alert
			if (window.confirm(message)) tx.retry();
		},
		[message],
	);

	useBlocker(blocker, when);
}

function HistorySample() {
	const navigate = useNavigate();
	const goBack = () => {
		const answer = window.confirm('정말 떠나시겠습니까?');
		if (answer) {
			navigate(-1);
		}
	};

	const goHome = () => {
		navigate('/');
	};

	usePrompt('현재 페이지를 떠나시겠습니까?', true);

	return (
		<div>
			<button onClick={goHome}>홈으로</button>
			<button onClick={goBack}>뒤로가기</button>
		</div>
	);
}

export default HistorySample;
