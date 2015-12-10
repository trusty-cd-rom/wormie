import { combineReducers } from 'redux';
import userProfile from './createRequest';
import currentWormhole from './currentWormhole';
import camera from './camera';

const rootReducer = combineReducers({
	userProfile,
	currentWormhole,
	camera,
});


export default rootReducer;