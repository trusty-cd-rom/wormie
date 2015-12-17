import { INIT_LIVE_CAMERA, UPDATE_LIVE_CAMERA } from '../constants/actions';
var youtube = require('../utils/youtubeApi');

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