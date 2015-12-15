var api = require('../utils/api');

import { 
  UPDATE_MY_CURRENT_WORMHOLE,
  UPDATE_MY_CURRENT_SUBMISSION,
  UPDATE_MY_CURRENT_WORMHOLE_LIST,
  GET_USER_INFO,
  SET_CURRENT_USER,
} from '../constants/actions';

export function updateMyCurrentWormhole(wormhole) {
  // console.log('update my current wormhole', wormhole)
  return {
    type: UPDATE_MY_CURRENT_WORMHOLE,
    wormhole
  };
};

export function updateMyCurrentSubmission(submission) {
  // console.log('update my current submission', submission)
  return {
    type: UPDATE_MY_CURRENT_SUBMISSION,
    submission
  };
};

// submission from other users for my request
export function updateMyCurrentWormholeList(wormholeSubmissions) {
  console.log('update my current wormhole list', wormholeSubmissions);
  return {
    type: UPDATE_MY_CURRENT_WORMHOLE_LIST,
    submissionsForWormholes: wormholeSubmissions
  }
}

export function getUserInfo(id) {
  return dispatch => {
    api.getUserDetails(id)
      .then(function (res) {
        dispatch(setCurrentUser(res));
      });
  }
}

function setCurrentUser(res) {
  return {
    type: SET_CURRENT_USER,
    userData: res
  };
}
