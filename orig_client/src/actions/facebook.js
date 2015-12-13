import api from '../utils/api';
import { CONVERT_FACEBOOK_TOKEN_TO_DJANGO_TOKEN } from '../constants/actions';

export function convertFacebookToken(tokenData, cb) {
    
  console.log("I'm in the convertFacebookToken action ");
  console.log("tokenData: ", tokenData);
    
  return dispatch => {

    return api.convertToken(tokenData)
      .then((res) => {
        console.log("This is what I get back from django", res);
        cb();
      })
  }
};
