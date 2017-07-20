// polyfills
import 'babel-polyfill';
import injectTapEvent from 'react-tap-event-plugin';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './domain/reducers';

import App from './AppContainer';
import Login from './components/containers/Login';
import Home from './components/containers/Home';

import { requireAuth } from './domain/auth/routeHelpers';
import { restoreSession } from './domain/auth/AuthActions';
import { loadPets } from './domain/pets/PetActions';
import UserRepository from './domain/user/UserRepository';


injectTapEvent();

// setup store (combination of middleware and reducers)
const middlewares = [
    routerMiddleware(hashHistory),
    thunk
];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)
);
const store = createStoreWithMiddleware(reducers);

const history = syncHistoryWithStore(hashHistory, store);

// mount and render the application
const rootElement = document.getElementById('js-root-container');

const storeHasUser = () => store.getState().auth.user;

render(
    <Provider store={store}>
        <Router history={history}>
            <Route
                path="/"
                component={App}
                onEnter={() => store.dispatch(restoreSession(UserRepository.restoreSession()))}
            >
                <IndexRoute component={Login} />
                <Route
                    path="home"
                    component={Home}
                    onEnter={requireAuth(storeHasUser, () => store.dispatch(loadPets()))}
                />
            </Route>
        </Router>
    </Provider>,
    rootElement
);
