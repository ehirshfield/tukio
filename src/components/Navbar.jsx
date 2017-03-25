import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import logo from '../../public/assets/img/logo.png';
import { logout } from '../actions/authAction.js';

class Navbar extends React.Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }
    render() {
        const { isAuthenticated } = this.props.auth;
        const user = this.props.auth.user.username;
        const userLinks = (
            <ul className="nav-right">
                <Link to="/userprofile"><li id="nav-links">{user}</li></Link>
                <Link to="/#" onClick={this.logout.bind(this)}><li id="nav-links">Log Out</li></Link>
            </ul>
        )

        const guestLinks = (
            <ul className="nav-right">
                <Link to="/login"><li id="nav-links">Log In</li></Link>
            </ul>
        )
        return (
            <nav id="nav-bar">
                <a href="/"><img id="logo" src={logo} /></a>
                {isAuthenticated ? userLinks : guestLinks}
            </nav>
        )
    }
}

Navbar.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Navbar);