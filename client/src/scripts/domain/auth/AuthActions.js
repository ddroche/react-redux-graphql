import { push as pushLocation } from 'react-router-redux';

import asyncActionCreator from '../asyncActionCreator';

import {
    UserCredentials
} from '../user/UserTypes';
import UserRepository from '../user/UserRepository';

// HELPER FUNCTIONS

function _storeSession(user) {
    localStorage.user = JSON.stringify(user);
}

function _clearSession() {
    localStorage.clear();
}

/**
 * ACTION NAMES
 *
 * These constants are shared between actions, and the reducers that respond to them
 * be sure to export these
 */
export const LOGIN_STARTED = 'login-started';
export const LOGIN_SUCCEEDED = 'login-succeeded';
export const LOGIN_FAILED = 'login-failed';

export const login = asyncActionCreator({

    actions: [LOGIN_STARTED, LOGIN_SUCCEEDED, LOGIN_FAILED],

    task: async (credentials, dispatch) => {
        const params = UserCredentials(credentials);

        const user = await UserRepository.login(params);

        _storeSession(user);

        // Ordinarily, I'd use the commented out example below
        // instead of a set timeout.  However, this simple seed is already
        // very short on examples of using asyncActionCreator, so I went with
        // this instead
        setTimeout(() => dispatch(pushLocation('/home')), 0);

        return user;
    },

    meta: ['credentials']
});

// this is a much better example of using a vanilla thunk to execute
// multiple stages of dispatches when your final action does not
// return the store resource itself
/*
export const login = userCredentials => async dispatch => {
    dispatch({ type: LOGIN_STARTED });

    let user;

    try {
        user = await UserRepository.login(userCredentials);
    } catch (e) {
        // early exit from the entire chain
        return dispatch({
            type: LOGIN_FAILED,
            payload: e
        });
    }

    _storeSession(user);

    dispatch({
        type: LOGIN_SUCCEEDED,
        payload: user
    });
    dispatch(pushLocation('/home'))
}

 */


export const restoreSession = user => (dispatch, getState) => {
    // existing user check needed to support hash history, which is really only
    // in place until the mock API is moved off onto another port
    const existingUser = getState().auth.user;

    // don't bother restoring if the state already has a user, or
    // if the restore session action was invoked without a user session
    // -- normally, try to avoid polytyped arguments such as this, but in this case
    // it's a handy shortcut to making the `requireAuth` router onEnter handler easier
    // to write
    if (existingUser || !user) {
        return;
    }

    dispatch({
        type: LOGIN_SUCCEEDED,
        payload: user
    });

    dispatch(pushLocation('/home'));
};


export const LOGOUT = 'logout';
export const logout = () => dispatch => {
    _clearSession();
    dispatch({
        type: LOGOUT
    });

    dispatch(pushLocation('/'));
};

export const sessionTimeout = logout;
