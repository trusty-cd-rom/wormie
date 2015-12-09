import api from '../utils/api';

export const CREATE_REQUEST = 'CREATE_REQUEST';
export const TOGGLE_FETCH = 'TOGGLE_FETCH';

//this will be called by the create request component when the user submits the form for a new wormhole
export function createRequest(requestData) {
  return dispatch => {
  	dispatch(startFetching());
	  // return api.createWormhole()
	  // 	.then((res) => {
	  // 		dispatch(createRequestAction(res))
	  // 		dispatch(stopFetching());
	  // 	})
	  // 	.catch((err) => console.log(err))
	  console.log('about to send the new createRequest to server');
	  return setTimeout(() => {
	  	console.log('got successful post back from server');
	  	dispatch(createRequestAction(requestData))
	  	dispatch(stopFetching());
    }, 3000);
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

function startFetching() {
	return {
		type: TOGGLE_FETCH,
		status: 'true'
	};
};

function stopFetching() {
	return {
		type: TOGGLE_FETCH,
		status: 'false'
	};
};