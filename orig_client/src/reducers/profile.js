import { 
  UPDATE_MY_CURRENT_WORMHOLE,
  UPDATE_MY_CURRENT_SUBMISSION,
  UPDATE_MY_CURRENT_WORMHOLE_LIST,
  TOGGLE_ANIMATING,
  SET_CLICKED_USER,
  TOGGLE_PEEK_CLICKED_USER,
} from '../constants/actions';

//this will take in a newly selected wormhole, and store that is the one that is currently selected in the app
function myCurrentWormhole(state = {}, action) {
  switch (action.type) {
    case UPDATE_MY_CURRENT_WORMHOLE:
      console.log('hit my current wormhole reducer', action.wormhole);
      return action.wormhole;
    default:
      return state;
  }
  return state;
};

//this will take in a newly selected wormhole, and store that is the one that is currently selected in the app
function myCurrentSubmission(state = {}, action) {
  switch (action.type) {
    case UPDATE_MY_CURRENT_SUBMISSION:
      console.log('myCurrentSubmission', state)
      return action.submission;
    default:
      return state;
  }
  return state;
};

function myCurrentWormholeList(state = {}, action) {
  switch (action.type) {
    case UPDATE_MY_CURRENT_WORMHOLE_LIST:
      return action.submissionsForWormholes;
    default:
      return state;
  }
};

var initialState = {
  isAnimating: false,
  wormhole: {},
  submission: {},
  submissionsForWormholes: [],
  clickedUser: {},
  peekClickedUser: false,
}

function profile(state = initialState, action) {
  switch (action.type) {
    // single matched wormhole from wormhole list
    case UPDATE_MY_CURRENT_WORMHOLE:
      return {
        ...state,
        wormhole: myCurrentWormhole(state.wormhole, action)
      }
    // submission to check
    case UPDATE_MY_CURRENT_SUBMISSION:
      return {
        ...state,
        submission: myCurrentSubmission(state.submission, action)
      };
    // wormhole with submissions to check
    case UPDATE_MY_CURRENT_WORMHOLE_LIST:
      return {
        ...state,
        submissionsForWormholes: myCurrentWormholeList(state.submissionsForWormholes, action)
      };

    // for spinner
    case TOGGLE_ANIMATING:
      return {
        ...state,
        isAnimating: action.status
      }

    // copy current user info to this
    case SET_CLICKED_USER:
      console.log('hit set clicekd user reducer');
      return {
        ...state,
        clickedUser: action.userData
      }

    case TOGGLE_PEEK_CLICKED_USER:
      console.log('hit toggle peek reducer');
      return {
        ...state,
        peekClickedUser: action.status
      }

    default:
      return state;
  }
}

export default profile;
