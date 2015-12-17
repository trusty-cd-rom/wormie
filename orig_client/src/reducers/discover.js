import { SET_RESULT_LIST, SET_CURRENT_CATEGORY, SET_CURRENT_TERM, SET_CURRENT_LOCATION } from '../constants/actions';

var initialState = {};

function discover(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      console.log('hit reducer');
      return {
        ...state,
        category: action.category
      }
    case SET_CURRENT_TERM:
      console.log('set current term from reducer');
      return {
        ...state,
        term: action.term
      }
    case SET_CURRENT_LOCATION:
      console.log('set current location reducer');
      return {
        ...state,
        location: action.location
      }
    case SET_RESULT_LIST:
      console.log('set result list');
      return {
        ...state,
        responseList: action.responseList
      }
    default:
      return state;
  }
  return state;
};

export default discover;
