import { combineReducers } from 'redux';
// import counter from './counter';

const rootReducer = combineReducers({
  counter
});

export default rootReducer;


function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT_COUNTER':
    return state + 1;
  case 'DECREMENT_COUNTER':
    return state - 1;
  default:
    return state;
  }
};