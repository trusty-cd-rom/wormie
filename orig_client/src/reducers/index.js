import { combineReducers } from 'redux';
import userProfile from './createRequest';
import currentWormhole from './currentWormhole';
import camera from './camera';
import feed from './feed';
import pendingWormholeSubmission from './pendingWormholeSubmission';
import profile from './profile';
import yelp from './yelp';
const rootReducer = combineReducers({
	userProfile,
	currentWormhole,
	camera,
	pendingWormholeSubmission,
	feed,
  profile,
  yelp,
});

export default rootReducer;
