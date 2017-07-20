import { User } from './UserTypes';

class UserRepository {
    restoreSession = () => {
        let user = null;

        if (localStorage.user) {
            try {
                user = new User(JSON.parse(localStorage.user));
            } catch (e) {
                // either localstorage was manipulated with an invalid user,
                // or the user struct has been updated since the last time a user
                // was stored in localstorage
                //
                // either way, do nothing
            }
        }

        return user;
    };

    login(credentials) {
        return new Promise(resolve => setTimeout(() => resolve(User({ username: credentials.username })), 1000));
    }
}

export default new UserRepository();
