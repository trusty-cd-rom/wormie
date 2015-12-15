import { UPDATE_CURRENT_WORMHOLE, UPDATE_FEED } from '../constants/actions';
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