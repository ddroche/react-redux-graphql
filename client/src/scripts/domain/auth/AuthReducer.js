import t from 'tcomb';
import { createReducer } from 'redux-create-reducer';


import { routeActions } from 'react-router-redux'; // used by actions that need to change the URL / integrate with routing

// import action types
import {
    LOGIN_STARTED,
    LOGIN_SUCCEEDED,
    LOGIN_FAILED,
    LOGOUT
} from './AuthActions';


// type imported for type checking, naturally
import { User } from '../user/UserTypes';

import { mergeStruct } from '../stateHelpers';

// define the type parameters for the state
/**
 * @class AuthenticationState
 */
const AuthenticationState = t.struct({
    /**
     * @property
     * @type {Boolean}
     */
    isLoading: t.Boolean,
    /**
     * @property
     * @type {Null|User}
     */
    user: t.maybe(User), // user may or may not exist
    /**
     * @property
     * @param {Null|Error}
     */
    error: t.maybe(t.Error) // loading the user may or may not have errored
}, 'AuthenticationState');

// these states are effectively constant types-
// the application may switch between them, but their values aren't
// in any way dependent upon the action's payload
const INITIAL_STATE = AuthenticationState({
    isLoading: false,
    user: null,
    error: null
});

const LOADING_STATE = AuthenticationState({
    isLoading: true,
    user: null,
    error: null
});


const mergeState = mergeStruct(AuthenticationState);

const reducer = createReducer(INITIAL_STATE, {
    [LOGIN_STARTED]: () => LOADING_STATE,

    [LOGIN_SUCCEEDED]: (state, action) => mergeState({
        isLoading: false,
        user: action.payload
    }),

    [LOGIN_FAILED]: (state, action) => mergeState({
        isLoading: false,
        error: action.payload
    }),

    [LOGOUT]: () => INITIAL_STATE
});

export default reducer;
