var api = require('../utils/api');

import { 
  UPDATE_MY_CURRENT_WORMHOLE,
  // testing
  UPDATE_CURRENT_WORMHOLE,
  UPDATE_MY_CURRENT_SUBMISSION,
  UPDATE_MY_CURRENT_WORMHOLE_LIST,
  GET_USER_INFO,
  SET_CURRENT_USER,
  TOGGLE_ANIMATING,
  SET_CLICKED_USER,
  TOGGLE_PEEK_CLICKED_USER,
  CREATE_WORMIE
} from '../constants/actions';

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

// submission from other users for my request
export function updateMyCurrentWormholeList(wormholeSubmissions) {
  console.log('update my current wormhole list', wormholeSubmissions);
  return {
    type: UPDATE_MY_CURRENT_WORMHOLE_LIST,
    submissionsForWormholes: wormholeSubmissions
  }
}

export function getUserInfo(id) {
  return dispatch => {
    return api.getUserDetails(id)
      .then(function (res) {
        dispatch(setClickedUser(res));
      });
  }
}

export function getUserDetailsForLoggedInUser() {

  return dispatch => {
      return api.fetchFacebookProfileFromFacebook((res) => {
        return api.getUserDetailsByFacebookID(res.id)
              .then((res) => {
                dispatch(setCurrentUser(res));
        });
      });
  }
}

// export function updateClickedUser(id) {
//   // console.log('update my current wormhole', wormhole)
//   return dispatch => {
//     return api.getUserDetails(id)
//       .then(function (res) {
//         dispatch()
//       });
//   };
//   return {
//     type: UPDATE_MY_CURRENT_WORMHOLE,
//     wormhole
//   };
// };

function setCurrentUser(res) {
  return {
    type: SET_CURRENT_USER,
    userData: res
  };
}

export function setClickedProfile(data) {
  console.log(data);
  return {
    type: SET_CLICKED_USER,
    userData: data
  }
}

// function setClickedUser(res) {
//   return {
//     type: SET_CLICKED_USER,
//     userData: res
//   };
// }

export function stopClickedUser() {
  console.log('stop clicked user from action');
  return {
    type: TOGGLE_PEEK_CLICKED_USER,
    status: false
  }
}

function startFetching() {
  return {
    type: TOGGLE_ANIMATING,
    status: true
  };
};

function stopFetching() {
  return {
    type: TOGGLE_ANIMATING,
    status: false
  };
};

export function getUserInfo(id) {
  return dispatch => {
    api.getUserDetails(id)
      .then(function (res) {
        dispatch(setCurrentUser(res));
      });
  }
}

function setCurrentUser(res) {
  return {
    type: SET_CURRENT_USER,
    userData: res
  };
}

export function toggleAnimating(isAnimating) {
  isAnimating = isAnimating ? false : true;
  return dispatch => {
    return dispatch({
      type: TOGGLE_ANIMATING,
      isAnimating
    });
  }
}

export function updateCurrentWormhole(wormhole) {
  return {
    type: UPDATE_CURRENT_WORMHOLE,
    wormhole: wormhole

  };
};
