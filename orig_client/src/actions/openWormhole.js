import { INIT_PENDING_WORMHOLE_SUBMISSION } from '../constants/actions';

export function initPendingSubmission(wormhole) {
  return {
    type: INIT_PENDING_WORMHOLE_SUBMISSION,
    wormhole
  };
};