import { combineReducers } from 'redux';
import docks from './docks';
import windows from './windows';

const rootReducer = combineReducers({
	windows, docks
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;