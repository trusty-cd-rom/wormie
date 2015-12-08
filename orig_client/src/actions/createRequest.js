import api from '../utils/api';

const CREATE_REQUEST = 'CREATE_REQUEST';

export function createRequest(requestData) {
  return dispatch => {
	  return api.createWormhole()
	  	.then(
	  		// wormhole => dispatch()
	  	)
  }

  {
    type: CREATE_REQUEST

  };
};