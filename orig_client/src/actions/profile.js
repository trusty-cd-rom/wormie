var api = require('../utils/api');

import { 
  UPDATE_MY_CURRENT_WORMHOLE,
  UPDATE_MY_CURRENT_SUBMISSION,
  UPDATE_MY_CURRENT_WORMHOLE_LIST,
  GET_USER_INFO,
  SET_CURRENT_USER,
  TOGGLE_ANIMATING,
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
    dispatch(startFetching());
    return api.getUserDetails(id)
      .then(function (res) {
        dispatch(setCurrentUser(res));
        dispatch(stopFetching());
      });
  }
}

function setCurrentUser(res) {
  return {
    type: SET_CURRENT_USER,
    userData: res
  };
}

function startFetching() {
  return {
    type: TOGGLE_ANIMATING,
    status: true
  };
};

function stopFetching() {
  return {
    type: TOGGLE_ANIMATING,
    status: false
  };
};

