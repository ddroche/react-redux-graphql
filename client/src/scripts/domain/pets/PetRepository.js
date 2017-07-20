import axios from 'axios';

import { Pet, PetList } from './PetTypes';

/**
 * @class PetRepository
 */
class PetRepository {
    /**
     * Get all pets the user has access to
     * @return {Promise<Array<Pet>>} A promise that unwraps to an array of pets
     */
    getAll() {
        return axios.get('/pets')
            .then(({ data }) => {
                const mockData = data.map(datum => {
                    // eslint-disable-next-line no-param-reassign
                    datum.profilePicture += `?random=${Math.random()}${Math.random()}`;
                    return datum;
                });

                return PetList(mockData);
            });
    }

    /**
     * [createPet description]
     * @param  {[type]} pet [description]
     * @return {[type]}     [description]
     */
    createPet(pet) {
        return axios.post('/pets', pet)
            .then(({ data }) => Pet(data));
    }

    getPet(id) {
        return axios.get(`/pets/${id}`)
            .then(({ data }) => Pet(data));
    }

    deletePet(id) {
        return axios.delete(`/pets/${id}`);
    }
}

export default new PetRepository();
