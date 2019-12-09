import * as SignInActionTypes from '../actionTypes/SignInActionTypes';

export const setUserName = event => {

    return {
        type: SignInActionTypes.SET_USERNAME_STATE,
        payload: event
    }
}

export const setUserPassword = event => {

    return {
        type: SignInActionTypes.SET_PASSWORD_STATE,
        payload: event
    }
}