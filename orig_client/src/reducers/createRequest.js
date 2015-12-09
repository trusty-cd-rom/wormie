import { CREATE_REQUEST, TOGGLE_FETCH} from '../actions/createRequest';

function reducerRoute(state ={}, action) {
	console.log('createRequest>reducerRoute')
  switch (action.type) {
	  case CREATE_REQUEST:
	    return {
	    	...state,
	    	user: userReducerRoute(state.user, action)
	    };
	  case TOGGLE_FETCH:
	  	console.log('toggling fetch to: ',action.status, 'state is: ', state)
	    return {
	    	...state,
	    	isFetching: action.status
	    };
	  default:
	    return state;
  }
  return state;
};

function userReducerRoute(state = {}, action) {
	console.log('createRequest>reducerRoute>userReducerRoute')
	switch (action.type) {
	  case CREATE_REQUEST:
	  	return {
	  		...state,
	  		myRequests: userRequestReducerRoute(state.wormholes, action)
	  	}
	  default:
	    return state;
  }
};

function userRequestReducerRoute(state = [], action) {
	console.log('createRequest>reducerRoute>userReducerRoute>userRequestReducerRoute')
	switch (action.type) {
	  case CREATE_REQUEST:
	  	return [
	  		...state,
	  		action.newRequestData
	  	]
	  default:
	    return state;
  }
};

export default reducerRoute;
