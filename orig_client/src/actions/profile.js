import { UPDATE_MY_CURRENT_WORMHOLE, UPDATE_MY_CURRENT_SUBMISSION } from '../constants/actions';

export function updateMyCurrentWormhole(wormhole) {
  // console.log('update my current wormhole', wormhole)
  return {
    type: UPDATE_MY_CURRENT_WORMHOLE,
    wormhole
  };
};

export function updateMyCurrentSubmission(submission) {
  // console.log('update my current submission', submission)
  return {
    type: UPDATE_MY_CURRENT_SUBMISSION,
    submission
  };
};

