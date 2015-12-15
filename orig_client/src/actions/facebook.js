import api from '../utils/api';
import { CONVERT_FACEBOOK_TOKEN_TO_DJANGO_TOKEN, SET_CURRENT_USER } from '../constants/actions';

export function convertFacebookToken(tokenData, cb) {
    
  return dispatch => {
    return api.convertToken(tokenData)
      .then((res) => {
        return api.fetchFacebookProfileFromFacebook((res) => {
            return api.getUserDetailsByFacebookID(res.id)
              .then((res) => {
                dispatch(setCurrentUser(res));
                cb();
            });
        });        
      });
  }
};

function setCurrentUser(res) {
  return {
    type: SET_CURRENT_USER,
    userData: res
  };
}
