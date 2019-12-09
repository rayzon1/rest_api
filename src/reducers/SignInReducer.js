import * as SignInActionTypes from '../actionTypes/SignInActionTypes';

const initialState = {
    username: '',
    password: ''
}

export default function SignInReducer(state = initialState, action) {

    switch (action.type) {
        case SignInActionTypes.SET_USERNAME_STATE:
            return {
                ...state,
                username: action.payload
            }

        case SignInActionTypes.SET_PASSWORD_STATE:
            return {
                ...state,
                password: action.payload
            }
            
    
        default:
            return state;
    }

}