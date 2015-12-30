import { TOGGLE_VIDEO_UPLOADING, UPDATE_SUBMISSION_INPUT_TEXT, INIT_WORMHOLE_SUBMISSION_COORDINATES } from '../constants/actions';
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
    		// sent the new submission record to our server to add to the db
            console.log('this is the response from upload video', 'this is the id i am gonna use for the video!', JSON.parse(res.data));
    		return api.createSubmission({
    			wormhole: pendingWormholeSubmission.wormhole.id,
    			submitter: currentUser.id,
                notes: pendingWormholeSubmission.submissionForm.notes,
    			video_url: JSON.parse(res.data).id,
                location: JSON.stringify(pendingWormholeSubmission.locationData),
                video_thumbnail: JSON.parse(res.data).snippet.thumbnails.medium,
    		})
    	})
    	.then((res) => {
    		//done with the update!
    		//now we can refresh the user profile data and return to the feed or to profile
    		//for now we will just return to the feed
            // console.log('came back from post submit' ,res, res.wormhole)
            return api.updateWormholeDetails(res.wormhole, {status: 'completed'});
        })
        .then((res) => {
            // console.log('just updated the wormhole submitted against: ', res);
            dispatch(toggleUploading());
            cb();
        })
    	.catch((err => console.log(err)))
    ;
  };
};


export function updateInputText(field, text) {
  return {
    type: UPDATE_SUBMISSION_INPUT_TEXT,
    field,
    text
  };
};

export function initSubmissionCoordinates() {
  return {
    type: INIT_WORMHOLE_SUBMISSION_COORDINATES
  }
};

