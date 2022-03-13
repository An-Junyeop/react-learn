import axios from 'axios';

export const getMovies = async () => {
	const { data } = await axios.get(
		`https://api.themoviedb.org/3/
		discover/movie
		?api_key=e6bfb3c9270e0abb8070d30f2aa8ad8c
		&language=ko-KR
		&include_adult=true
		&page=1`,
	);
	return data;
};

export const getMovieDetails = async id => {
	const { data } = await axios.get(
		`https://api.themoviedb.org/3/
			movie/${id}
			?api_key=e6bfb3c9270e0abb8070d30f2aa8ad8c
			&language=ko-KR
			&append_to_response=genre`,
	);
	console.log('getMovieDetails', data);
	return data;
};
