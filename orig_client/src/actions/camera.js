import { INIT_CAMERA, SWITCH_CAMERA, TOGGLE_CAMERA_RECORDING } from '../constants/actions';

export function initCameraState(cameraState) {
	console.log('hi from camera action, initCameraState')
  return {
    type: INIT_CAMERA,
    cameraState
  };
};

export function switchCamera(cameraType) {
	console.log('hi from camera action, switchCamera')
  return {
    type: SWITCH_CAMERA,
    cameraType
  };
};

export function toggleRecording() {
  return {
    type: TOGGLE_CAMERA_RECORDING
  }
}