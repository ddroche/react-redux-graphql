import asyncActionCreator from '../asyncActionCreator';

import PetRepository from './PetRepository';

export const PETS_LOAD_STARTED = 'pets-load-started';
export const PETS_LOAD_SUCCEEDED = 'pets-load-succeeded';
export const PETS_LOAD_FAILED = 'pets-load-failed';

export const loadPets = asyncActionCreator({
    actions: [PETS_LOAD_STARTED, PETS_LOAD_SUCCEEDED, PETS_LOAD_FAILED],
    task: () => PetRepository.getAll()
});
