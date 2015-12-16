import { SET_CURRENT_USER, UPDATE_CURRENT_WORMHOLE, UPDATE_FEED, COPY_CURRENT_USER,  } from '../constants/actions';
import api from '../utils/api';

export function updateCurrentWormhole(wormhole) {
  return {
    type: UPDATE_CURRENT_WORMHOLE,
    wormhole: wormhole

  };
};

export function refreshFeedData() {
  return dispatch => {
    return api.getWormholeList()
    .then((res) => {
      // console.log('APIIIII!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', res)
      dispatch(refreshFeedDataAction(res))
    })
  }
};

export function refreshFeedDataAction(data) {
  return {
    type: UPDATE_FEED,
    data: data
  };
};

export function copyCurrentUser (data) {
  return {
    type: COPY_CURRENT_USER,
    userData: data
  }
}

export function setOtherUsersProfile(data) {
  return {
    type: SET_CURRENT_USER,
    userData: data
  }
}

export function getUserInfo(id, navigator) {
  return dispatch => {
    return api.getUserDetails(id)
      .then(function (res) {
        dispatch(setOtherUsersProfile(res));
        navigator();
      });
  }
}
