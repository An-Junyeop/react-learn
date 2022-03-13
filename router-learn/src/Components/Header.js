import { NavLink } from 'react-router-dom';

function Header() {
	const isSelected = ({ isActive }) => {
		const style = {
			padding: '3px 30px',
			textDecoration: 'none',
		};
		if (isActive) {
			return {
				...style,
				background: '#000',
				color: '#fff',
			};
		} else {
			return {
				...style,
			};
		}
	};

	return (
		<ul
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-around',
				listStyle: 'none',
			}}
		>
			<li>
				<NavLink to='/' style={isSelected}>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink style={isSelected} to='/about'>
					About
				</NavLink>
			</li>
			<li>
				<NavLink style={isSelected} to='/profiles'>
					Profiles
				</NavLink>
			</li>
			<li>
				<NavLink style={isSelected} to='/history'>
					History Example
				</NavLink>
			</li>
		</ul>
	);
}

export default Header;
