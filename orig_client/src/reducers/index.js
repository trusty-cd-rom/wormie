import { combineReducers } from 'redux';
import userProfile from './createRequest';
import currentWormhole from './currentWormhole';
import camera from './camera';
import feed from './feed';
import pendingWormholeSubmission from './pendingWormholeSubmission';
import myCurrentWormhole from './myCurrentWormhole';
import myCurrentSubmission from './myCurrentSubmission';

const rootReducer = combineReducers({
	userProfile,
	currentWormhole,
	camera,
	pendingWormholeSubmission,
	feed,
  myCurrentWormhole,
  myCurrentSubmission,
>>>>>>> Split wormholes and submissions
});

export default rootReducer;
