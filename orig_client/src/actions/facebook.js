import api from '../utils/api';
import { CONVERT_FACEBOOK_TOKEN_TO_DJANGO_TOKEN, SET_CURRENT_USER } from '../constants/actions';

export function convertFacebookToken(tokenData, cb) {
    
  console.log("I'm in the convertFacebookToken action ");
  console.log("tokenData: ", tokenData);
  return dispatch => {
    return api.convertToken(tokenData)
      .then((res) => {
        cb();
      });
  }
};

export function getUserDataFromServer(fb_id, cb) {
  return dispatch => {
    return api.getUserDetailsByFacebookID(fb_id)
      .then((res) => {
        console.log('I got the user data from Django server!');
        console.log('res: ', res);
        dispatch(setCurrentUser(res));
        cb();
      });
  }
};

function setCurrentUser(res) {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  console.log("I want to set the current user to:", res);
  return {
    type: SET_CURRENT_USER,
    userData: res
  };
}
