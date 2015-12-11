import { INIT_CAMERA, SWITCH_CAMERA, TOGGLE_CAMERA_RECORDING, TOGGLE_VIDEO_UPLOADING, UPDATE_WORMHOLE_SUBMISSION_VIDEO } from '../constants/actions';
var youtube = require('../utils/youtubeApi');

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
};

export function toggleUploading() {
  return {
    type: TOGGLE_VIDEO_UPLOADING
  }
};

export function uploadVideo(videoData) {
  return dispatch => {
    // dispatch(toggleUploading());
    console.log('coming to you live from uploadVideo: ', youtube, videoData)
    return youtube.postVideo(videoData);
  };
};

export function updateSubmissionVideo(video) {
  return {
    type: UPDATE_WORMHOLE_SUBMISSION_VIDEO,
    video
  }
};

    // .then((res) => {
    //   console.log('vid uploaded: ', res);
    //   // dispatch(updateCurrentSubmission(res));
    //   dispatch(toggleUploading());
    // })
    // .catch((err) => console.log(err))