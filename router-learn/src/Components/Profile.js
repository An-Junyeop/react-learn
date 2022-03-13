import { useParams, useSearchParams } from 'react-router-dom';

const profileData = {
	battleMaster: {
		name: '배틀마스터',
		description: `전광석화와 같은 속도로 손발을 자유 자재로 사용하는 클래스입니다.`,
	},
	infighter: {
		name: '인파이터',
		description: `인파이터는 적들에게 파고드는 능력이 우수한 전형적인 근접 클래스입니다.`,
	},
	soulMaster: {
		name: '기공사',
		description: `기공사는 내공을 사용하여 근접 및 원거리 공격을 다양하게 사용할 수 있는 중거리 클래스입니다.`,
	},
	lanceMaster: {
		name: '창술사',
		description: `창술사는 상황에 맞게 스탠스를 변경할 수 있는 클래스입니다.`,
	},
};

function Profile() {
	const { classname } = useParams();
	const profile = profileData[classname];

	const [searchParams, setSearchParams] = useSearchParams();
	const name = searchParams.get('name');
	const detail = searchParams.get('detail');
	console.log(name, detail);

	if (!profile) {
		return <div>존재하지 않는 클래스입니다.</div>;
	}
	return (
		<div>
			<h3>{profile.name}</h3>
			<p>{profile.description}</p>
		</div>
	);
}
export default Profile;
