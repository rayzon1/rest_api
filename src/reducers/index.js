// Reducers container.

/**
 *  User sign-in page reducers and state.
 */
// export const credentialsState = {
//     username: '',
//     password: ''
//   }
  
// export function credentialsReducer(state, action) {
//     switch (action.type) {
//       case 'setUserName':
//         return { ...state, username: action.payload};
//       case 'setUserPassword':
//         return {...state, password: action.payload}
//       default:
//         throw new Error('Error in credentialsReducer.');
//     }
//   }

import SignInReducer from './SignInReducer';

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
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