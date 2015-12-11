import { CREATE_REQUEST, ADD_USER_INFO, TOGGLE_FETCH, UPDATE_INPUT_TEXT, UPDATE_SIGNUP_INPUT_TEXT} from '../constants/actions';
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
	},
	isFetching: 'false'
};


var initialState2 = {
  "id": 2,
  "user": {
    "username": "",
    "first_name": "charlie",
    "last_name": "harrington",
    "email": "chdude@gmail.com",
    "wormholes": [
      {
        "id": 3,
        "title": "McDonalds line right now",
        "latitude": "50.0000000",
        "longitude": "60.0000000",
        "deadline": "2015-12-07T19:03:50.702834Z",
        "notes": "now!",
        "status": "open",
        "owner": 1,
        "owner_name": "wormieadmin",
        "submissions": []
      },
      {
        "id": 4,
        "title": "hiking trail",
        "latitude": "50.0000000",
        "longitude": "60.0000000",
        "deadline": "2015-12-07T20:04:58.456637Z",
        "notes": "hahahahaha",
        "status": "forever and ever",
        "owner": 1,
        "owner_name": "wormieadmin",
        "submissions": []
      },
      {
        "id": 6,
        "title": "golden gate",
        "latitude": "20.0000000",
        "longitude": "20.0000000",
        "deadline": "2015-12-07T20:04:58.456637Z",
        "notes": "can you walk backwards?",
        "status": "OPEN!!!",
        "owner": 1,
        "owner_name": "wormieadmin",
        "submissions": []
      }
    ],
    "submissions": [{
        "id": 3,
        "title": "McDonalds line right now",
        "latitude": "50.0000000",
        "longitude": "60.0000000",
        "deadline": "2015-12-07T19:03:50.702834Z",
        "notes": "now!",
        "status": "open",
        "owner": 1,
        "owner_name": "wormieadmin",
        "submissions": []
      },
      {
        "id": 4,
        "title": "hiking trail",
        "latitude": "50.0000000",
        "longitude": "60.0000000",
        "deadline": "2015-12-07T20:04:58.456637Z",
        "notes": "hahahahaha",
        "status": "forever and ever",
        "owner": 1,
        "owner_name": "wormieadmin",
        "submissions": []
      },
      {
        "id": 6,
        "title": "golden gate",
        "latitude": "20.0000000",
        "longitude": "20.0000000",
        "deadline": "2015-12-07T20:04:58.456637Z",
        "notes": "can you walk backwards?",
        "status": "OPEN!!!",
        "owner": 1,
        "owner_name": "wormieadmin",
        "submissions": []
      }]
  },
  "created_at": "",
  "updated_at": "",
  "picture_url": "http://innovateelt.com/wp/wp-content/uploads/2015/09/charlie-harrington-headshot-330x330.jpg",
  "location": "",
  "about_me": "",
  "wormie_color": ""
}

var initialState3 = {
  "username": "",
  "first_name": "Charlie",
  "last_name": "Harrington",
  "email": "chdude@gmail.com",
  "wormholes": [
    {
      "id": 3,
      "title": "McDonalds line right now",
      "latitude": "50.0000000",
      "longitude": "60.0000000",
      "deadline": "2015-12-07T19:03:50.702834Z",
      "notes": "now!",
      "status": "open",
      "owner": 1,
      "owner_name": "wormieadmin",
      "submissions": []
    },
    {
      "id": 4,
      "title": "hiking trail",
      "latitude": "50.0000000",
      "longitude": "60.0000000",
      "deadline": "2015-12-07T20:04:58.456637Z",
      "notes": "hahahahaha",
      "status": "forever and ever",
      "owner": 1,
      "owner_name": "wormieadmin",
      "submissions": []
    },
    {
      "id": 6,
      "title": "golden gate",
      "latitude": "20.0000000",
      "longitude": "20.0000000",
      "deadline": "2015-12-07T20:04:58.456637Z",
      "notes": "can you walk backwards?",
      "status": "OPEN!!!",
      "owner": 1,
      "owner_name": "wormieadmin",
      "submissions": []
    }
  ],
  "submissions": [{
      "id": 3,
      "title": "McDonalds line right now",
      "latitude": "50.0000000",
      "longitude": "60.0000000",
      "deadline": "2015-12-07T19:03:50.702834Z",
      "notes": "now!",
      "status": "open",
      "owner": 1,
      "owner_name": "wormieadmin",
      "submissions": []
    },
    {
      "id": 4,
      "title": "hiking trail",
      "latitude": "50.0000000",
      "longitude": "60.0000000",
      "deadline": "2015-12-07T20:04:58.456637Z",
      "notes": "hahahahaha",
      "status": "forever and ever",
      "owner": 1,
      "owner_name": "wormieadmin",
      "submissions": []
    },
    {
      "id": 6,
      "title": "golden gate",
      "latitude": "20.0000000",
      "longitude": "20.0000000",
      "deadline": "2015-12-07T20:04:58.456637Z",
      "notes": "can you walk backwards?",
      "status": "OPEN!!!",
      "owner": 1,
      "owner_name": "wormieadmin",
      "submissions": []
    }
  ]
};

// function createUserProfile(state = initialState2, action) {
//   switch(action.type) {
//     case ADD_USER_INFO:
//       return {
//         ...state,
//         about_me: action["about_me"],
//         user: updateName(state.user, action)
//       }
//     default:
//       return state;
//   }
// }

// function updateName(state = initialState3, action) {
//   switch(action.type) {
//     case ADD_USER_INFO:
//       return {
//         ...state,
//         username: action.username
//       }
//     default:
//       return state;
//   }
// }

function userProfile(state = initialState, action) {
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
	  case UPDATE_INPUT_TEXT:
	   	return {
	   		...state,
	   		createRequest: createRequestReducerRoute(state.createRequest, action)
	   	}
    case UPDATE_SIGNUP_INPUT_TEXT:
      return {
        ...state,
        currentUser: updateCurrentUser(state.currentUser, action)
      }
	  // case ADD_USER_INFO:
	  // 	return {
	  // 		...state,
	  // 		currentUser: createUserProfile(state.currentUser, action)
	  // 	}
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

function updateCurrentUser(state, action) {
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


export default userProfile;
