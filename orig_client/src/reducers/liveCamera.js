import { INIT_LIVE_CAMERA, UPDATE_LIVE_CAMERA } from '../constants/actions';

var initialState = {
      info: 'Initializing',
      status: 'init',
      roomID: '',
      selfViewSrc: null,
      remoteList: {},
      pcPeers: {},
      streamMaster: false
    };

function liveCamera(state = initialState, action) {
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