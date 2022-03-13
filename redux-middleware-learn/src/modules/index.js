/* 루트 리듀서 */
import { combineReducers } from 'redux';
import counter from './counter';
import characters from './characters';

const rootReducer = combineReducers({ counter, characters });

export default rootReducer;
