import { combineReducers } from 'redux';
import userProfile from './createRequest';
import currentWormhole from './currentWormhole';
import camera from './camera';
import pendingWormholeSubmission from './pendingWormholeSubmission';

const rootReducer = combineReducers({
	userProfile,
	currentWormhole,
	camera,
	pendingWormholeSubmission,
});

export default rootReducer;
