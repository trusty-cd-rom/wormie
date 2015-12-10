import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

//adding in middleware that allows for async functions to occur before the logic in our reducers
//reducers are only supposed to have pure javascript functions

export default function configureStore(initialState) {
	const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleware(reducer, initialState);
};
