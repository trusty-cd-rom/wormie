import api from '../utils/api';
import { ADD_USER_INFO, UPDATE_SIGNUP_INPUT_TEXT, TOGGLE_FETCH, SET_CURRENT_USER } from '../constants/actions';

//this will be called by the create request component when the user submits the form for a new wormhole
// export function createRequest(requestData) {
//   return dispatch => {
//     dispatch(startFetching());
//     // return api.createWormhole()
//     //  .then((res) => {
//     //    dispatch(createRequestAction(res))
//     //    dispatch(stopFetching());
//     //  })
//     //  .catch((err) => console.log(err))
//     console.log('about to send the new createRequest to server');
//     return setTimeout(() => {
//       console.log('got successful post back from server');
//       dispatch(createRequestAction(requestData))
//       dispatch(stopFetching());
//     }, 200);
//   }
// };

export function getUserDataFromFB() {
  return dispatch => {
    console.log('FB dispatch is working');
    dispatch(startUpdating());
    // TODO: AFTER FB AUTHENTICATION WORK WITH FRONT-END
    //       Change it to real data from fb
    return api.getUserDetails(2)
      .then((res) => {
        console.log('got data from server');
        console.log('res: ', res);
        dispatch(setCurrentUser(res));
      });
  }
}

export function updateUserProfile(updatedUserData, cb) {
  console.log('hey');
  return dispatch => {
    dispatch(startUpdating());
    return api.createUser()
     .then((res) => {
        console.log(res);
        dispatch(updateUserProfileAction(updatedUserData));
        dispatch(stopUpdating());
        cb();
     })
     .catch((err) => console.log(err));
  }
}

//returns the create request action object
// will be called by createRequest after the data for the new wormhole has been sent and accepted by the server DB
var updateUserProfileAction = (newUserData) => {
  return {
    type: ADD_USER_INFO,
    'about_me': newUserData['about_me'],
    'wormie_color': newUserData['wormie_color'],
    'username': newUserData['username'],
  };
};

function startUpdating() {
  return {
    type: TOGGLE_FETCH,
    status: 'true'
  };
};

function stopUpdating() {
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

function setCurrentUser(res) {
  return {
    type: SET_CURRENT_USER,
    userData: res
  };
}
