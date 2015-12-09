import { combineReducers } from 'redux';
import userProfile from './createRequest';
import currentWormhole from './currentWormhole';

const rootReducer = combineReducers({
	userProfile,
	currentWormhole,
});


export default rootReducer;