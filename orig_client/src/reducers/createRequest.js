import { CREATE_REQUEST, ADD_USER_INFO, UPDATE_SIGNUP_SLIDER, TOGGLE_FETCH, UPDATE_INPUT_TEXT, SET_CURRENT_USER, UPDATE_SIGNUP_INPUT_TEXT} from '../constants/actions';
import data from '../testData/data';


// console.log(data, data.userList[0]);

var initialState = {
	feed: data.wormholeList,
	currentUser: {},
	createRequest: {
		title: '',
		location: '',
		deadline: '',
		notes: '',
	},
  updateProfile: {
    'fb_id': '',
    'about_me': '',
    'username': '',
    'wormie_red': 20,
    'wormie_green': 100,
    'wormie_blue' : 120,
    'wormie_color': '',
  },
	isFetching: 'false'
};


function userProfile(state = initialState, action) {
	// console.log('createRequest>reducerRoute', state)
  switch (action.type) {
	  case CREATE_REQUEST:
	    return {
	    	...state,
	    	feed: feedReducerRoute(state.feed, action)
	    };
	  case TOGGLE_FETCH:
	  	// console.log('toggling fetch to: ',action.status, 'state is: ', state)
	    return {
	    	...state,
	    	isFetching: action.status
	    };
	  case UPDATE_INPUT_TEXT:
	   	return {
	   		...state,
	   		createRequest: createRequestReducerRoute(state.createRequest, action)
	   	}
    case UPDATE_SIGNUP_INPUT_TEXT:
      return {
        ...state,
        updateProfile: updateSignUpInput(state.updateProfile, action)
      }
    case UPDATE_SIGNUP_SLIDER:
      return {
        ...state,
        updateProfile: updateSignUpSlider(state.updateProfile, action)
      }
	  case ADD_USER_INFO:
	  	return {
	  		...state,
	  		currentUser: updateProfile(state.currentUser, action)
	  	}
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          ...action.userData
        }
      }
	  default:
	    return state;
  }
  return state;
};

function feedReducerRoute(state, action) {
	// console.log('createRequest>reducerRoute>feedReducerRoute', state)
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
	// console.log('createRequest>reducerRoute>userReducerRoute', state)
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
	// console.log('createRequest>reducerRoute>createRequestReducerRoute', state)
	switch (action.type) {
	  case UPDATE_INPUT_TEXT:
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
	// console.log('createRequest>reducerRoute>userReducerRoute>userRequestReducerRoute', state)
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


function updateSignUpSlider(state, action) {
  switch (action.type) {
    case UPDATE_SIGNUP_SLIDER:
      let updatedInfo = {};
      updatedInfo[action.field] = action.value;
      return {
        ...state,
        ...updatedInfo
      }
  }
}


function updateSignUpInput(state, action) {
  switch (action.type) {
    case UPDATE_SIGNUP_INPUT_TEXT:
      let updatedInfo = {};
      updatedInfo[action.field] = action.text;
      return {
        ...state,
        ...updatedInfo
      }
  }
}

function updateProfile(state, action) {
  switch(action.type) {
    case ADD_USER_INFO:
      return {
        ...state,
        'about_me': action['about_me'],
        'username': action['username'],
        'wormie_color': action['wormie_color'],
        'fb_id': action['fb_id'],
        'wormie_red': action['wormie_red'],
        'wormie_green': action['wormie_green'],
        'wormie_blue': action['wormie_blue'],
      }
    default:
      return state;
  }
}

export default userProfile;
