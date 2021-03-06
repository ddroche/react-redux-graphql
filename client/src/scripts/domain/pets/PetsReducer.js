import t from 'tcomb';
import { createReducer } from 'redux-create-reducer';

// import actions to respond to
import {
    PETS_LOAD_STARTED,
    PETS_LOAD_SUCCEEDED,
    PETS_LOAD_FAILED
} from './PetActions';

import { LOGOUT } from '../auth/AuthActions';

// type imported for type checking, naturally
import { PetList } from './PetTypes';


// define the type parameters for the state
/**
 * @class PetsState
 */
const PetsState = t.struct({
    /**
     * @property
     * @type {Boolean}
     */
    isLoading: t.Boolean,
    /**
     * @property
     * @type {Null|PetList}
     */
    pets: t.maybe(PetList),
    /**
     * @property
     * @param {Null|Error}
     */
    error: t.maybe(t.Error) // loading the user may or may not have errored
}, 'PetsState');

// these states are effectively constant types-
// the application may switch between them, but their values aren't
// in any way dependent upon the action's payload
const INITIAL_STATE = new PetsState({
    isLoading: false,
    pets: null,
    error: null
});

const LOADING_STATE = new PetsState({
    isLoading: true,
    pets: null,
    error: null
});

export default createReducer(INITIAL_STATE, {
    [LOGOUT]: () => INITIAL_STATE,

    [PETS_LOAD_STARTED]() {
        return LOADING_STATE;
    },

    [PETS_LOAD_FAILED](state, action) {
        return new PetsState({
            isLoading: false,
            error: action.payload.error,
            pets: null
        });
    },

    [PETS_LOAD_SUCCEEDED](state, action) {
        return new PetsState({
            isLoading: false,
            error: null,
            pets: action.payload
        });
    }
});
