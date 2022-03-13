import { Link, Route, Routes, Outlet } from 'react-router-dom';
import Profile from './Profile';

function Profiles() {
	return (
		<div>
			<h3>클래스 목록</h3>
			<ul>
				<li>
					<Link to='/profiles/battleMaster'>배틀마스터</Link>
				</li>
				<li>
					<Link to='/profiles/infighter'>인파이터</Link>
				</li>
				<li>
					<Link to='/profiles/soulMaster'>기공사</Link>
				</li>
				<li>
					<Link to='/profiles/lanceMaster'>창술사</Link>
				</li>
			</ul>

			<Outlet />
		</div>
	);
}
export default Profiles;
