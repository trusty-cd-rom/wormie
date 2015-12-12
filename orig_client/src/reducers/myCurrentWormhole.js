import { UPDATE_MY_CURRENT_WORMHOLE } from '../constants/actions';

var initialState = {};

//this will take in a newly selected wormhole, and store that is the one that is currently selected in the app
function myCurrentWormhole(state = {}, action) {
  switch (action.type) {
    case UPDATE_MY_CURRENT_WORMHOLE:
      console.log('hit my current wormhole reducer', action.wormhole);
      return action.wormhole;
    default:
      return state;
  }
  return state;
};

export default myCurrentWormhole;
