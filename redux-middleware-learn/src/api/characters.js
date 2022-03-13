/* (n)ms 대기하는 프로미스 생성 함수*/
const sleep = s => new Promise(resolve => setTimeout(resolve, s));

/* post mock data*/
const characters = [
	{
		id: 1,
		name: '배틀마스터',
		img: `https://ww.namu.la/s/dacdc5235b02f4c95b57be9c202013cd999d112cd5b8091c8cc0505243baad27eaf478518f717521327ae403e863cc333a1b49158b9e401c9fb95934c14cdff6ab28ad4e1527b09618f9f120272dd94502f24d279a0be8148e771ad5d1f85a70b15be15b06ada27f25d1cac8c5cc582a`,
	},
	{
		id: 2,
		name: '인파이터',
		img: `https://ww.namu.la/s/b8c73eccd51bc3ed2a0e6fcbc23869a27ca83a30e4b91b3c75230d547319f2b74a273817fc7c18348b2d6b2f91c24785c4e96843ef2ee7e5b1c0ebf4d3045b178feca70830f50a19290a2baf09104470bc3dedd4184ef4321c092aa9431f0117ffb4fe5c204c916e0192b205107202f0`,
	},
	{
		id: 3,
		name: '기공사',
		img: `https://w.namu.la/s/82a0f37bb98d9cc83a654d940f6b76bc19edac3b9f61fe8bf2f5304675d8762ef4efdde01c680df05dfd0f9a6844de27a0a977d178c046eb15b359336623a921d1a60a90eff0be1e83a1e58b1bb46879a074202f669c4caab8ffba2e9ba248b38cb604e7d34aa23f882787fa6e7737db`,
	},
	{
		id: 4,
		name: '창술사',
		img: `https://w.namu.la/s/e069b4d5a150f0c0097a6638038eaab9a7946adb47e3e1e20c1af0cd6a338ec2ab2aa2ecaba7a0075c74319b2200b4bcc6a2be12c9d3ac93e2e0ccf0f1ea3272cf79f0662e3e1dd9c27fd7dab519c4cb0efc0d2a9ab62399df32dcbac75eb54d4658d93477e1701c6b0d2c8ba431050e`,
	},
];

export const getCharacters = async () => {
	await sleep(1000);
	return characters;
};

export const getCharacterById = async id => {
	await sleep(1000);
	return characters.find(character => character.id === id);
};
