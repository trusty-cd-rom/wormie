import {
	INIT_PENDING_WORMHOLE_SUBMISSION,
	UPDATE_WORMHOLE_SUBMISSION_VIDEO,
	TOGGLE_VIDEO_UPLOADING,
	UPDATE_SUBMISSION_INPUT_TEXT,
	UPDATE_WORMHOLE_SUBMISSION_COORDINATES,
	INIT_WORMHOLE_SUBMISSION_COORDINATES,
} from '../constants/actions';

var initialState = {
	isUploading: false,
	submissionForm: {
		notes: ''
	},
	locationData: []
};

//this will take in a newly selected wormhole, and store that is the one that is currently selected in the app
function pendingWormholeSubmission(state = initialState, action) {
	// console.log('pendingWormholeSubmission', state)
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
	  case UPDATE_WORMHOLE_SUBMISSION_COORDINATES:
	  	return {
	  		...state,
	  		locationData: locationData(state.locationData, action)
	  	}
	  case INIT_WORMHOLE_SUBMISSION_COORDINATES:
	  	return {
	  		...state,
	  		locationData: []
	  	}
	  case TOGGLE_VIDEO_UPLOADING:
	  	return {
	  		...state,
	  		isUploading: !state.isUploading
	  	}
	  case UPDATE_SUBMISSION_INPUT_TEXT:
	  	return {
	   		...state,
	   		submissionForm: submissionForm(state.submissionForm, action)
	   	}
	  default:
	    return state;
  }
  return state;
};

function locationData(state, action) {
	// console.log(action);
	return [
		...state,
		action.coordinates
	]
};

function submissionForm(state, action) {
	switch (action.type) {
	  case UPDATE_SUBMISSION_INPUT_TEXT:
	  	let newVal = {};
	  	newVal[action.field] = action.text;
	  	return {
	  		...state,
	  		...newVal 
	  	}
	  default:
	    return state;
  }
};

export default pendingWormholeSubmission;