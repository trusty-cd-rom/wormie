import { SET_CURRENT_CATEGORY } from '../constants/actions';

var initialState = {};

function yelp(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        category: action.catogory
      }
    default:
      return state;
  }
  return state;
};

export default yelp;
