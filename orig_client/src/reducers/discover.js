import { SET_CURRENT_CATEGORY, SET_CURRENT_TERM, SET_CURRENT_LOCATION } from '../constants/actions';

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
      console.log('set current term reducer');
      return {
        ...state,
        term: action.term
      }
    case SET_CURRENT_LOCATION:
      console.log('set current locatoin reducer');
      return {
        ...state,
        location: action.location
      }
    default:
      return state;
  }
  return state;
};

export default discover;
