import { UPDATE_FEED } from '../constants/actions';

var initialState = [];

function feed(state = initialState, action) {
  switch (action.type) {
	  case UPDATE_FEED:
	    return action.data
	  default:
	    return state;
  }
  return state;
};

export default feed;
