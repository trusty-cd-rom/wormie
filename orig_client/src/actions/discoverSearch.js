import { SET_QUERY_COORDS, SET_CURRENT_TERM, SET_CURRENT_LOCATION, SET_RESULT_LIST, SET_CURRENT_TARGET } from '../constants/actions';
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

// coordinates: object
export function setCoords(coordinates) {
  return {
    type: SET_QUERY_COORDS,
    coordinates
  }
}

export function setResultList(responseList) {
  return {
    type: SET_RESULT_LIST,
    responseList
  }
}

export function setCurrentTarget(target) {
  return {
    type: SET_CURRENT_TARGET,
    target
  }
}

export function searchInfo (category, term, location) {
  return dispatch => {
    return queryInfo(category, term, location)
      .then(function (responseList) {
        if (responseList.error) {
          dispatch(setResultList(responseList.error));
        } else {
          dispatch(setResultList(responseList.businesses));
        }
      });
  }
}
