import { TOGGLE_VIDEO_UPLOADING } from '../constants/actions';
var youtube = require('../utils/youtubeApi');
var api = require('../utils/api');

export function toggleUploading() {
  return {
    type: TOGGLE_VIDEO_UPLOADING
  }
};

export function uploadWormholeSubmission(pendingWormholeSubmission, currentUser, cb) {
  return dispatch => {
    dispatch(toggleUploading());
    console.log('coming to you live from uploadVideo: ', youtube, pendingWormholeSubmission.video)
    return youtube.postVideo(pendingWormholeSubmission.video)
    	.then((res) => {
    		//sent the new submission record to our server to add to the db
    		// return api.createSubmission({
    		// 	pendingWormholeSubmission,
    		// 	currentUser,
    		// 	video: res
    		// })
    		//for now we will fake the post to server
    		return setTimeout(() => {
    			return;
    		}, 3000)
    	})
    	.then((res) => {
    		//done with the update!
    		//now we can refresh the user profile data and return to the feed or to profile
    		//for now we will just return to the feed
            dispatch(toggleUploading());
            cb();
    	})
    	.catch((err => console.log(err)))
    ;
  };
};
