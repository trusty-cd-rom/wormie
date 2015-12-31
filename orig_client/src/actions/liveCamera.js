import { INIT_LIVE_CAMERA, UPDATE_LIVE_CAMERA, ADD_LIVE_CHAT_MESSAGE } from '../constants/actions';

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

export function newChatMessage(message) {
  return {
    type: ADD_LIVE_CHAT_MESSAGE,
    message
  };
}
