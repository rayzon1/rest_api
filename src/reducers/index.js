// Reducers container.

import SignInReducer from './SignInReducer';

import { createStore, combineReducers, compose } from "redux";
// import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// put store here and combine reducers then export

const rootReducer = combineReducers({
  
  SignInState: SignInReducer,
  
});

const searchStore = () => {
  return createStore(
    rootReducer,
    compose(
      composeWithDevTools()
    )
  );
};

const store = searchStore();
export default store;