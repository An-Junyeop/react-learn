import {
	getMovieDetails,
	useMoviesDispatch,
	useMoviesState,
} from './MoviesContext';
import { useEffect } from 'react';

function Movie({ id }) {
	const state = useMoviesState();
	const dispatch = useMoviesDispatch();
	const { loading, data: movie, error } = state.movie;

	useEffect(() => {
		getMovieDetails(dispatch, id);
	}, [id, dispatch]);

	if (loading) return <div>Movie Loading...</div>;
	if (error) return <div>Error !!!</div>;
	if (!movie) return null;

	return (
		<div
			style={{
				width: '500px',
				position: 'fixed',
				top: 10,
				right: 10,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{movie.poster_path ? (
				<img
					src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
					alt={movie.title}
				/>
			) : (
				<div>NO IMAGE AVAILABLE</div>
			)}
			<div>
				{movie.title} | {movie.runtime}분
			</div>
			<div>{movie.release_date}</div>
			<div>
				{movie.genres.map(genre => (
					<span key={genre.id} style={{ padding: '0 5px' }}>
						{genre.name}
					</span>
				))}
			</div>
			<div>{movie.overview}</div>
			<div>평점 : {movie.vote_average}</div>
			<div>
				{movie.production_companies.map((production, i) => (
					<span key={production.id} style={{ padding: '0 5px' }}>
						{production.name}
					</span>
				))}
			</div>
		</div>
	);
}

export default Movie;
