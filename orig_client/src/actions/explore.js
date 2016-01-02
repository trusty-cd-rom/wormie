import { UPDATE_FEED, UPDATE_CURRENT_WORMHOLE, SET_USER_LOCATION, SET_CURRENT_FEED_TAB } from '../constants/actions';
import api from '../utils/api';

export function refreshFeedData(cb) {
  return dispatch => {
    return api.getWormholeList()
    .then((res) => {
      dispatch(refreshFeedDataAction(res));
      cb();
    })
  }
};

export function refreshFeedDataAction(data) {
  return {
    type: UPDATE_FEED,
    data: data
  };
};

export function updateCurrentWormhole(wormhole) {
  return {
    type: UPDATE_CURRENT_WORMHOLE,
    wormhole: wormhole
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

export function setCurrentLocation(lon, lat) {
  return {
    type: SET_USER_LOCATION,
    longitude: lon,
    latitude: lat
  }
}

export function sortList(criteria, longitude, latitude) {
  return dispatch => {
    console.log(criteria, longitude, latitude);
    return api.sortList(criteria, longitude, latitude)
      .then(function (res) {
        dispatch(refreshFeedDataAction(res))
      })
  }
}

export function setCurrentFeedTab(tab) {
  return {
    type: SET_CURRENT_FEED_TAB,
    tab
  }
}

