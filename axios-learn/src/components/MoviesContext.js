import { createContext, useContext, useReducer } from 'react';
import createAsyncDispatcher, {
	createAsyncHandler,
	initialAsyncState,
} from '../utils/asyncActionUtils';
import * as api from '../utils/api';

const initialState = {
	movies: initialAsyncState,
	movie: initialAsyncState,
};

const moviesHandler = createAsyncHandler('GET_MOVIES', 'movies');
const movieHandler = createAsyncHandler('GET_MOVIE', 'movie');

/* 제작한 객체와 유틸 함수를 사용하여 리듀스 제작 */
function moviesReducer(state, action) {
	switch (action.type) {
		case 'GET_MOVIES':
		case 'GET_MOVIES_SUCCESS':
		case 'GET_MOVIES_ERROR':
			return moviesHandler(state, action);

		case 'GET_MOVIE':
		case 'GET_MOVIE_SUCCESS':
		case 'GET_MOVIE_ERROR':
			return movieHandler(state, action);

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

/* State, Dispatch Context 생성 */
const MoviesStateContext = createContext(null);
const MoviesDispatchContext = createContext(null);

/* Context들의 Provider로 감싸기 */
export function MoviesProvider({ children }) {
	const [state, dispatch] = useReducer(moviesReducer, initialState);
	return (
		<MoviesStateContext.Provider value={state}>
			<MoviesDispatchContext.Provider value={dispatch}>
				{children}
			</MoviesDispatchContext.Provider>
		</MoviesStateContext.Provider>
	);
}

/* State 조회 커스텀 Hook */
export function useMoviesState() {
	const state = useContext(MoviesStateContext);
	if (!state) {
		throw new Error(`Cannot find MoviesProvider`);
	}
	return state;
}

/* Dispatch 사용 커스텀 Hook */
export function useMoviesDispatch() {
	const dispatch = useContext(MoviesDispatchContext);
	if (!dispatch) {
		throw new Error(`Cannot find MoviesProvider`);
	}
	return dispatch;
}

export const getMovies = createAsyncDispatcher('GET_MOVIES', api.getMovies);
export const getMovieDetails = createAsyncDispatcher(
	'GET_MOVIE',
	api.getMovieDetails,
);
