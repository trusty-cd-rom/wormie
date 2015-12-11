import { INIT_PENDING_WORMHOLE_SUBMISSION, UPDATE_WORMHOLE_SUBMISSION_VIDEO, TOGGLE_VIDEO_UPLOADING } from '../constants/actions';

var initialState = {
	isUploading: false
};

//this will take in a newly selected wormhole, and store that is the one that is currently selected in the app
function pendingWormholeSubmission(state = initialState, action) {
	console.log('pendingWormholeSubmission', state)
  switch (action.type) {
  	case INIT_PENDING_WORMHOLE_SUBMISSION:
	    return {
	    	...state,
	    	wormhole: action.wormhole
	    }
	  case UPDATE_WORMHOLE_SUBMISSION_VIDEO:
	    return {
	    	...state,
	    	video: action.video
	    }
	  case TOGGLE_VIDEO_UPLOADING:
	  	return {
	  		...state,
	  		isUploading: !state.isUploading
	  	}
	  default:
	    return state;
  }
  return state;
};

export default pendingWormholeSubmission;