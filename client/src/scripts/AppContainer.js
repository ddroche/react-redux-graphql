import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppTheme from './theme/AppTheme';

import { logout } from './domain/auth/AuthActions';
import { routeActions } from 'react-router-redux';

import AppNavBar from './components/presentation/navigation/AppNav';

class AppContainer extends Component {
    render() {
        const props = this.props;
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(AppTheme)}>
                <div>
                    <AppNavBar
                        user={props.user}
                        titleTouchHandler={props.titleTouchHandler}
                        logoutHandler={this.props.logout}
                    />
                    <h1>Hello {props.user ? props.user.username : 'World'}!</h1>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.object,
    logout: PropTypes.func.isRequired,
    titleTouchHandler: PropTypes.func.isRequired
};

// the key passed through context must be called "muiTheme"
AppContainer.childContextTypes = {
    muiTheme: React.PropTypes.object,
};


const mapStateToProps = state => ({
    user: state.auth.user
});

const bindActionsToProps = {
    logout,
    titleTouchHandler: function routeHomeAction() {
        return routeActions.push('/home');
    }
};

export default connect(
    mapStateToProps,
    bindActionsToProps
)(AppContainer);
