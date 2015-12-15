import { UPDATE_CURRENT_WORMHOLE } from '../constants/actions';

var initialState = {};

//this will take in a newly selected wormhole, and store that is the one that is currently selected in the app
function currentWormhole(state = {}, action) {
  switch (action.type) {
	  case UPDATE_CURRENT_WORMHOLE:
	    return action.wormhole;
	  default:
	    return state;
  }
  return state;
};

export default currentWormhole;
