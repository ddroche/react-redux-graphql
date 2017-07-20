const _defaultAuthCheck = hasUser => (nextState, replace) => {
    if (!hasUser()) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        });

        return false;
    }

    return true;
};

const _wrappedAuthCheck = (hasUser, onEnter) => {
    const _authCheck = _defaultAuthCheck(hasUser);

    return (nextState, replace) => {
        if (_authCheck(nextState, replace)) {
            return onEnter(nextState, replace);
        }
    };
};

export const requireAuth = (hasUser, optOnEnterFunction) => {
    if (!optOnEnterFunction) {
        return _defaultAuthCheck(hasUser);
    }

    return _wrappedAuthCheck(hasUser, optOnEnterFunction);
};
