import { UPDATE_MY_CURRENT_SUBMISSION } from '../constants/actions';

var initialState = {};

//this will take in a newly selected wormhole, and store that is the one that is currently selected in the app
function myCurrentSubmission(state = {}, action) {
  switch (action.type) {
    case UPDATE_MY_CURRENT_SUBMISSION:
      // console.log('myCurrentSubmission', state)
      return action.submission;
    default:
      return state;
  }
  return state;
};

export default myCurrentSubmission;
