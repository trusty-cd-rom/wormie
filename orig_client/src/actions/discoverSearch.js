import { SET_CURRENT_TERM, SET_CURRENT_LOCATION, SET_RESULT_LIST } from '../constants/actions';
import { queryInfo } from '../utils/discoverApi'

export function setCurrentTerm(term) {
  console.log('set current term from action', term);
  return {
    type: SET_CURRENT_TERM,
    term
  }
}

export function setCurrentLocation(location) {
  return {
    type: SET_CURRENT_LOCATION,
    location
  }
}

function setResultList(responseList) {
  return {
    type: SET_RESULT_LIST,
    responseList
  }
}

export function searchInfo (category, term, location) {
  return dispatch => {
    return queryInfo(category, term, location)
      .then(function (responseList) {
        dispatch(setResultList(responseList));
      });
  }
}
// export function updateCurrentWormhole(wormhole) {
//   return {
//     type: UPDATE_CURRENT_WORMHOLE,
//     wormhole
//   };
// };
