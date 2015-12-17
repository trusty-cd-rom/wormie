import { SET_CURRENT_CATEGORY } from '../constants/actions';

export function setCurrentCategoty(category) {
  return {
    type: SET_CURRENT_CATEGORY,
    category
  }
}

// export function initPendingSubmission(wormhole) {
//   return {
//     type: INIT_PENDING_WORMHOLE_SUBMISSION,
//     wormhole
//   };
// };

// export function updateCurrentWormhole(wormhole) {
//   return {
//     type: UPDATE_CURRENT_WORMHOLE,
//     wormhole
//   };
// };
