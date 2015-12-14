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

export function fetchFacebookProfile(cb) {

    console.log("Im in fetchFacebookProfile Action");
    
    return dispatch => {
      
      return api.fetchFacebookProfileFromFacebook((res) => {
          console.log("Action page: Result is: ", res);
          dispatch(getUserDataFromServer(res.id, cb));
      });
    }
};

export function getUserDataFromServer(fb_id, cb) {
  console.log("getUserDataFromServer: ", fb_id);
  return dispatch => {
    return api.getUserDetailsByFacebookID(fb_id)
      .then((res) => {
        console.log("Hello");
        dispatch(setCurrentUser(res));
        cb();
      });
  }
};

function setCurrentUser(res) {
  return {
    type: SET_CURRENT_USER,
    userData: res
  };
}
