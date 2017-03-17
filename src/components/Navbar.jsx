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
                <li id="nav-links"><Link to="#">{user} <i className="fa fa-angle-down"></i></Link></li>
                <li id="nav-links"><Link to="/#" onClick={this.logout.bind(this)}>Log Out</Link></li>
            </ul>
        )

        const guestLinks = (
            <ul className="nav-right">
                <li id="nav-links"><Link to="/login">Log In</Link></li>
            </ul>
        )
        return (
            <nav id="nav-bar">
                <img id="logo" src={logo} />
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