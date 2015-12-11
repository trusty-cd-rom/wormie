import { UPDATE_CURRENT_WORMHOLE } from '../constants/actions';

export function updateCurrentWormhole(wormhole) {
  return {
    type: UPDATE_CURRENT_WORMHOLE,
    //    {
    //   "id": 3,
    //   "title": "McDonalds line right now",
    //   "latitude": "50.0000000",
    //   "longitude": "60.0000000",
    //   "deadline": "2015-12-07T19:03:50.702834Z",
    //   "notes": "now!",
    //   "status": "completed",
    //   "owner": 1,
    //   "owner_name": "wormieadmin",
    //   "submissions": [1]
    // },
    wormhole: wormhole

  };
};
