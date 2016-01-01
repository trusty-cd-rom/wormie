import { INIT_LIVE_CAMERA, UPDATE_LIVE_CAMERA, ADD_LIVE_CHAT_MESSAGE, POP_LIVE_CHAT_MESSAGE } from '../constants/actions';

export function initCameraState(cameraState) {
  console.log('hi from camera action, initCameraState')
  return {
    type: INIT_LIVE_CAMERA,
    cameraState
  };
};


export function updateCameraState(field, text) {
  return {
    type: UPDATE_LIVE_CAMERA,
    field,
    text
  };
};

export function newChatMessageAdd(message) {
  return {
    type: ADD_LIVE_CHAT_MESSAGE,
    message
  };
};

export function removeOldestMessage() {
  return {
    type: POP_LIVE_CHAT_MESSAGE
  };
};

export function newChatMessage(message, cb) {
  return dispatch => {
    console.log('adding new message', message);
    dispatch(newChatMessageAdd(message));
    setTimeout(() => {
      console.log('about to remove oldest message', message);
      cb();
      // dispatch(removeOldestMessage());
    }, 5000)
  }
};