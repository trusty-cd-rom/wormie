import {STORE_FACEBOOK_TOKEN_IN_ASYNC_STORAGE, REMOVE_FACEBOOK_TOKEN} from '../constants/actions';

var initialState = {
  facebook: "init",
  // django: "init",
  // djangoRefresh: "init",
};

function storeToken(state = initialState, action) {
  // console.log("reducer storeToken with action: ", action);
  switch(action.type) {
    case STORE_FACEBOOK_TOKEN_IN_ASYNC_STORAGE:
      return {
        ...state,
        facebook: action['token']
      };
    case REMOVE_FACEBOOK_TOKEN:
      return state;
    default:
      return state;
  }
  return state;
};

export default storeToken;
