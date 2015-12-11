import api from '../utils/api';
import { ADD_USER_INFO, UPDATE_SIGNUP_INPUT_TEXT } from '../constants/actions';

//this will be called by the create request component when the user submits the form for a new wormhole
export function createRequest(requestData) {
  return dispatch => {
    dispatch(startFetching());
    // return api.createWormhole()
    //  .then((res) => {
    //    dispatch(createRequestAction(res))
    //    dispatch(stopFetching());
    //  })
    //  .catch((err) => console.log(err))
    console.log('about to send the new createRequest to server');
    return setTimeout(() => {
      console.log('got successful post back from server');
      dispatch(createRequestAction(requestData))
      dispatch(stopFetching());
    }, 200);
  }
};

//returns the create request action object
// will be called by createRequest after the data for the new wormhole has been sent and accepted by the server DB
var createRequestAction = (newUserData) => {
  return {
    type: ADD_USER_INFO,
    newRequestData
  };
};

function startFetching() {
  return {
    type: TOGGLE_FETCH,
    status: 'true'
  };
};

function stopFetching() {
  return {
    type: TOGGLE_FETCH,
    status: 'false'
  };
};

export function updateSignUpInputText(field, text) {
  return {
    type: UPDATE_SIGNUP_INPUT_TEXT,
    field,
    text
  };
};
