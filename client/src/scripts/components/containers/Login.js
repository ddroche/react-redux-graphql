import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { login } from '../../domain/auth/AuthActions';
import LoginForm from '../presentation/LoginForm';

function LoginLayout(props) {
    return (
        <LoginForm
            submit={props.submit}
            isLoading={props.isLoading}
            isErrored={props.isError}
        />
    );
}

LoginLayout.propTypes = {
    submit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    isLoading: state.auth.isLoading,
    isError: !!state.auth.error
});

export default connect(mapStateToProps, { submit: login })(LoginLayout);
