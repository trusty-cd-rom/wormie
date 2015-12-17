import { SET_CURRENT_CATEGORY } from '../constants/actions';

var initialState = {};

function discover(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      console.log('hit reducer');
      return {
        ...state,
        category: action.category
      }
    default:
      return state;
  }
  return state;
};

export default discover;
