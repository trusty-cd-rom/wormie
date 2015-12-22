import  { STORE_FACEBOOK_TOKEN_IN_ASYNC_STORAGE, SET_CURRENT_USER } from '../constants/actions';
import api from '../utils/api';


export function storeToken(token) {
  console.log("storing token: ", token);
  return {
    type: STORE_FACEBOOK_TOKEN_IN_ASYNC_STORAGE,
    'token': token
  };
};

export function getUserDetails(cb) {

  return api.fetchFacebookProfileFromFacebook((res) => {
    return api.getUserDetailsByFacebookID(res.id)
          .then((res) => {
            dispatch(setCurrentUser(res));
            cb();
    });
  });
}

function setCurrentUser(res) {
  return {
    type: SET_CURRENT_USER,
    userData: res
  };
}
