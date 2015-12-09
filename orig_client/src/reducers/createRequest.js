import { CREATE_REQUEST, TOGGLE_FETCH, UPDATE_INPUT_TEST} from '../actions/createRequest';
import data from '../testData/data';


console.log(data, data.userList[0]);

var initialState = {
	feed: data.wormholeList,
	currentUser: data.userList[0],
	createRequest: {
		title: '',
		location: '',
		deadline: '',
		notes: '',
		isFetching: 'false'
	}
};

function reducerRoute(state = initialState, action) {
	console.log('createRequest>reducerRoute', state)
  switch (action.type) {
	  case CREATE_REQUEST:
	    return {
	    	...state,
	    	feed: feedReducerRoute(state.feed, action)
	    };
	  case TOGGLE_FETCH:
	  	console.log('toggling fetch to: ',action.status, 'state is: ', state)
	    return {
	    	...state,
	    	isFetching: action.status
	    };
	   case UPDATE_INPUT_TEST:
	   	return {
	   		...state,
	   		createRequest: createRequestReducerRoute(state.createRequest, action)
	   	}
	  default:
	    return state;
  }
  return state;
};

function feedReducerRoute(state, action) {
	console.log('createRequest>reducerRoute>feedReducerRoute', state)
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

function userReducerRoute(state, action) {
	console.log('createRequest>reducerRoute>userReducerRoute', state)
	switch (action.type) {
	  case CREATE_REQUEST:
	  	return {
	  		...state,
	  		wormholes: userRequestReducerRoute(state.wormholes, action)
	  	}
	  default:
	    return state;
  }
};

function createRequestReducerRoute(state, action) {
	console.log('createRequest>reducerRoute>createRequestReducerRoute', state)
	switch (action.type) {
	  case UPDATE_INPUT_TEST:
	  	let newVal = {};
	  	newVal[action.field] = action.text;
	  	return {
	  		...state,
	  		...newVal 
	  	}
	  default:
	    return state;
  }
};

function userRequestReducerRoute(state = [], action) {
	console.log('createRequest>reducerRoute>userReducerRoute>userRequestReducerRoute', state)
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
