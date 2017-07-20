import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

const style = {
    base: { cursor: 'pointer' },
    icon: { fill: '#FFFFFF' }
};

const AppNavBar = props => (
    <AppBar
        title="React / redux starter seed"
        onTitleTouchTap={props.titleTouchHandler}
        style={style.base}
        iconElementLeft={
            <IconMenu
                iconButtonElement={
                    <IconButton iconStyle={style.icon} ><MoreVertIcon /></IconButton>
                }
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
                <MenuItem primaryText="Place" />
                <MenuItem primaryText="Holder" />
                <MenuItem primaryText="Content" />
            </IconMenu>
        }
        iconElementRight={
            props.user ? (<FlatButton label={'Log out'} onClick={props.logoutHandler} />) : null
        }
    />
);

AppNavBar.propTypes = {
    user: React.PropTypes.object,
    logoutHandler: React.PropTypes.func.isRequired,
    titleTouchHandler: React.PropTypes.func.isRequired
};

export default AppNavBar;
