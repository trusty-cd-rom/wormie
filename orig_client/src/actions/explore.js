import { UPDATE_FEED, UPDATE_CURRENT_WORMHOLE } from '../constants/actions';
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
