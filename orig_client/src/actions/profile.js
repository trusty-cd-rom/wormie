import { UPDATE_CURRENT_WORMHOLE } from '../constants/actions';

export function updateCurrentWormhole(wormhole) {
  return {
    type: UPDATE_CURRENT_WORMHOLE,
    wormhole
  };
};

// export function profile() {
//   return {
//     // type: INCREMENT_COUNTER
//   };
// };
