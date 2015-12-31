import { 
  SET_CLICKED_USER, 
  SET_CURRENT_USER, 
  UPDATE_CURRENT_WORMHOLE, 
  UPDATE_FEED, 
  COPY_CURRENT_USER, 
  TOGGLE_PEEK_CLICKED_USER,
} from '../constants/actions';

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

export function setClickedProfile(data) {
  // console.log('feedlist data plz', data);
  return {
    type: SET_CLICKED_USER,
    userData: data
  }
}

export function getUserInfo(id, navigator) {
  return dispatch => {
    return api.getUserDetails(id)
      .then(function (res) {
        dispatch(checkClickedUser());
        dispatch(setClickedProfile(res));
        navigator();
      });
  }
}

function checkClickedUser() {
  return {
    type: TOGGLE_PEEK_CLICKED_USER,
    status: true
  }
}

function refreshFeedDataAction(data) {
  return {
    type: UPDATE_FEED,
    data: data
  };
};
  
export function refreshFeedAsyncStorage(asyncStorage) {
  return dispatch => {
    return api.getWormholeList()
    .then((res) => {
      // console.log('orangedog this is what i got back from wormhole list', res);
      return asyncStorage.setItem('feedData_all', JSON.stringify(res));
    })
    .then(() => {
      // console.log('redface2222');
      dispatch(refreshFeedData_fromAsyncStorage(asyncStorage));
    })
  }
};

export function refreshFeedData_fromAsyncStorage(asyncStorage, cb) {
  return dispatch => {
    return asyncStorage.getItem('feedData_all')
    .then((data) => {
      // console.log('frogcat this is the information from async storage', data);
      dispatch(refreshFeedDataAction(JSON.parse(data)));
      if(cb) {cb()}
    })
  }
};

