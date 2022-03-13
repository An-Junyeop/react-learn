import { useEffect, useState } from 'react';
import Movie from './Movie';
import { getMovies, useMoviesDispatch, useMoviesState } from './MoviesContext';

function Movies() {
	const [movieId, setMovieId] = useState(null);
	const state = useMoviesState();
	const dispatch = useMoviesDispatch();
	const { loading, data: movies, error } = state.movies;

	useEffect(() => {
		getMovies(dispatch);
	}, [dispatch]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error !!!</div>;
	if (!movies) return null;

	return (
		<>
			<div>
				{movies.results.map(movie => (
					<div key={movie.id}>
						{movie.poster_path ? (
							<img
								src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
								alt={movie.title}
								onClick={() => setMovieId(movie.id)}
							/>
						) : (
							<div>NO IMAGE AVAILABLE</div>
						)}
						<p>
							{movie.title} / {movie.release_date}
						</p>
					</div>
				))}
			</div>
			{movieId && <Movie id={movieId} />}
		</>
	);
}
export default Movies;
