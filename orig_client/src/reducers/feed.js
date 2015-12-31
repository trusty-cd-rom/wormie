import { UPDATE_FEED, SET_USER_LOCATION, } from '../constants/actions';

var initialState = [];

function feed(state = initialState, action) {
  switch (action.type) {
	  case UPDATE_FEED:
	    return {
        ...state,
        list: action.data
      }
    case SET_USER_LOCATION:
      return {
        ...state,
        location: {
          longitude: action.longitude,
          latitude: action.latitude
        }
      }
	  default:
	    return state;
  }
  return state;
};

export default feed;
