import { INIT_LIVE_CAMERA, UPDATE_LIVE_CAMERA, ADD_LIVE_CHAT_MESSAGE, POP_LIVE_CHAT_MESSAGE } from '../constants/actions';

var initialState = {
      info: 'Initializing',
      status: 'init',
      roomID: '',
      selfViewSrc: null,
      remoteList: {},
      pcPeers: {},
      streamMaster: false,
      liveChatMessages: []
    };

function liveCamera(state = initialState, action) {
  switch (action.type) {
	  case INIT_LIVE_CAMERA:
	    return action.cameraState;
	  case UPDATE_LIVE_CAMERA:
	  	return updateLiveCamera(state, action)
	  case ADD_LIVE_CHAT_MESSAGE:
	  	return {
	  		...state,
	  		liveChatMessages: newChatMessage(state.liveChatMessages, action)
	  	}
	  case POP_LIVE_CHAT_MESSAGE:
	  	return {
	  		...state,
	  		liveChatMessages: removeOldestMessage(state.liveChatMessages, action)
	  	}
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

function newChatMessage(state, action) {
	return [
		...state,
		action.message
	];
};

function removeOldestMessage(state, action) {
	console.log('frogdogmog i am removing the last chat message from the reducer', action);
	if(state.length === 1) {
		return [];
	}

	return state.slice(1,state.length);
};


