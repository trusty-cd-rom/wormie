import { combineReducers } from 'redux';
import userProfile from './createRequest';
import currentWormhole from './currentWormhole';
import camera from './camera';
import feed from './feed';
import pendingWormholeSubmission from './pendingWormholeSubmission';
import profile from './profile';
import discover from './discover';
import liveCamera from './liveCamera';
import login from './login';
const rootReducer = combineReducers({
	userProfile,
	currentWormhole,
	camera,
	pendingWormholeSubmission,
	feed,
  profile,
  discover,
  liveCamera,
  login,
});

export default rootReducer;
