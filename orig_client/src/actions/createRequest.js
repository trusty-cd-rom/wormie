import api from '../utils/api';

import { CREATE_REQUEST, TOGGLE_FETCH, UPDATE_INPUT_TEST} from '../constants/actions';

//this will be called by the create request component when the user submits the form for a new wormhole
export function createRequest(requestData, cb) {
	console.log(requestData);
  return dispatch => {
  	dispatch(startPosting());
  	console.log('just changed posting state');
	  return api.createWormhole(requestData)
	  	.then((res) => {
	  		console.log('this is what the server said to me yesterday: ', res);
	  		dispatch(createRequestAction(res))
	  		dispatch(stopPosting());
	  		cb();
	  	})
	  // console.log('about to send the new createRequest to server');
	  // return setTimeout(() => {
	  // 	console.log('got successful post back from server');
	  // 	dispatch(createRequestAction(requestData))
	  // 	dispatch(stopFetching());
   //  }, 200);
  }
};

//returns the create request action object
// will be called by createRequest after the data for the new wormhole has been sent and accepted by the server DB
var createRequestAction = (newRequestData) => {
	return {
		type: CREATE_REQUEST,
		newRequestData
	};
};

function startPosting() {
	return {
		type: TOGGLE_FETCH,
		status: 'true'
	};
};

function stopPosting() {
	return {
		type: TOGGLE_FETCH,
		status: 'false'
	};
};

export function updateInputText(field, text) {
	return {
		type: UPDATE_INPUT_TEST,
		field,
		text
	};
};








