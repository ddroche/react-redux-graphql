# react-redux-starter

A starter seed for a react / redux application.

*Note:* This was originally intended to use jspm / system.js; however, because that project is still tied to babel 5.2.8 at the time of this writing, the project is using Browserify.  Expect this to change at some point in the future.

This is a rough outline of a project setup with:

Tools:

* Airbnb eslint config
* Babel 6+
* gulp
* browserify

Libraries:

* React
* react-router
* [Redux](http://rackt.org/redux/)
* [redux-simple-router](https://github.com/rackt/redux-simple-router) (exposes an action to invoke route changes)
* [redux-thunk](https://github.com/gaearon/redux-thunk)
* [tcomb](https://github.com/gcanti/tcomb) (provides immutable, typed objects and collections)
* [tcomb-form](https://github.com/gcanti/tcomb-form) (provides form markup validation, validation and error styling based on tcomb types)
* [axios](https://github.com/mzabriskie/axios) (for making AJAX requests)

Reducing boilerplate:

* redux-create-router (more or less copied from the [reducing boilerplate](http://rackt.org/redux/docs/recipes/ReducingBoilerplate.html) tutorial)
* asyncActionCreator - just a small helper file to create simple thunk-based sets of actions for you; just provide the action names and a task function that returns a promise

Totally tangential additions:

* [swagger-mock-api](https://github.com/dzdrazil/swagger-mock-api) because it's handy
* watch-based building and live reloading via `gulp --watch`

TODO:

- [x] Add immutable support (note: done with the delightful [tcomb](http://gcanti.github.io/tcomb/index.html) )
- [x] Add react router
- [x] Integrate react-router into redux state using redux router
- [ ] Follow [this issue](https://phabricator.babeljs.io/T2645) and upgrade babel version when appropriate to get decorator support back
- [ ] Implement PostCSS or SASS
- [ ] Implement some smart and dumb components
  * Redux explanation [here](http://redux.js.org/docs/basics/UsageWithReact.html)
  * Generic React best practice explanation [here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
  * In this project, "container" components "connect" the store to props, and "presentation" components are store-agnostic
- [x] Fix the Gulpfile
- [ ] Add in other requisite tasks to support SASS / PostCSS
- [ ] Add basic assets such as a favicon
