import { SET_CURRENT_TERM, SET_CURRENT_LOCATION } from '../constants/actions';

export function setCurrentTerm(term) {
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

// export function updateCurrentWormhole(wormhole) {
//   return {
//     type: UPDATE_CURRENT_WORMHOLE,
//     wormhole
//   };
// };
