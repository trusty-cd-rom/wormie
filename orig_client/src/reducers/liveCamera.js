import { INIT_LIVE_CAMERA, UPDATE_LIVE_CAMERA } from '../constants/actions';

var initialState = {};

function liveCamera(state = {}, action) {
  switch (action.type) {
	  case INIT_LIVE_CAMERA:
	    return action.cameraState;
	  case UPDATE_LIVE_CAMERA:
	  	return updateLiveCamera(state, action)
	  default:
	    return state;
  }
  return state;
};

export default liveCamera;

function updateLiveCamera(state, action) {
	let updatedField = {};
	updatedField[action.field] = action.text;
	return {
		...state,
		...updatedField
	}
};