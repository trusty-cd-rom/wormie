import { INIT_CAMERA, SWITCH_CAMERA, TOGGLE_CAMERA_RECORDING } from '../constants/actions';

var initialState = {};

//this will take in a newly selected wormhole, and store that is the one that is currently selected in the app
function camera(state = {}, action) {
	console.log('camera reducer', state)
  switch (action.type) {
	  case INIT_CAMERA:
	    return action.cameraState;
	  case SWITCH_CAMERA:
	    return {
	    	...state,
	    	cameraType: action.cameraType
	    };
	  case TOGGLE_CAMERA_RECORDING:
	  	return {
	  		...state,
	  		isRecording: !state.isRecording
	  	};
	  default:
	    return state;
  }
  return state;
};

export default camera;