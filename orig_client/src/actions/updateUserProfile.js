import api from '../utils/api';
import { ADD_USER_INFO, UPDATE_SIGNUP_INPUT_TEXT, UPDATE_SIGNUP_SLIDER, TOGGLE_FETCH, SET_CURRENT_USER, CREATE_WORMIE } from '../constants/actions';


export function getUserDataFromFB() {
  return dispatch => {
    console.log('FB dispatch is working');
    dispatch(startUpdating());
    // TODO: AFTER FB AUTHENTICATION WORK WITH FRONT-END
    //       Change it to real data from fb
    return api.getUserDetails(2)
      .then((res) => {
        console.log('got data from server');
        // console.log('res: ', res);
        dispatch(setCurrentUser(res));
      });
  }
}

export function createWormie(hexcode) {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log("hexcode is: ", hexcode);
  return dispatch => {
    return api.createWormie(hexcode);
  };
}


export function updateUserProfile(accountUpdate, cb) {
  return dispatch => {

    dispatch(startUpdating());

    return api.updateAccountDetails(accountUpdate)
     .then((res) => {
        dispatch(updateUserProfileAction(accountUpdate));

        var userData = {
          id: accountUpdate.user_id,
          username: accountUpdate.username
        };

        return api.updateUserDetails(userData)
          .then((res) => {
            dispatch(stopUpdating());
            cb();
          });
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
    'wormie_red': newUserData['wormie_red'],
    'wormie_green': newUserData['wormie_green'],
    'wormie_blue': newUserData['wormie_blue'],
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

export function updateSignUpSlider(field, value) {
  return {
    type: UPDATE_SIGNUP_SLIDER,
    field,
    value
  };
};


export function setCurrentUser(res) {
  return {
    type: SET_CURRENT_USER,
    userData: res
  };
}
