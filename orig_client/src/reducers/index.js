import { combineReducers } from 'redux';
import userProfile from './createRequest';
import currentWormhole from './currentWormhole';
import camera from './camera';
import pendingWormholeSubmission from './pendingWormholeSubmission';
import myCurrentWormhole from './myCurrentWormhole';
import myCurrentSubmission from './myCurrentSubmission';

const rootReducer = combineReducers({
	userProfile,
	currentWormhole,
	camera,
	pendingWormholeSubmission,
  myCurrentWormhole,
  myCurrentSubmission,
});

export default rootReducer;
