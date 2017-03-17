import React from 'react';
import Signup from './Signup.jsx';
import { connect } from 'react-redux';
import { logout } from '../actions/authAction.js';

class Header extends React.Component {
    constructor(props) {
        // calls the Component constructor function
        super(props);
        // the starting state of the `Home` Component
        this.state = {
            errors: {}
        };
    }

    displayModal() {
        let modal = document.getElementById('signupModal');
        let btn = document.querySelector("register");
        modal.style.display = "block";
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    closeModal() {
        let modal = document.getElementById('signupModal');
        let span = document.querySelector("close");
        modal.style.display = "none";
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const register = (
            <div className="register" onClick={this.displayModal}>Sign up with email</div>
        )

        const loggedIn = (
            "No"
        )
        return (
            <div className="header">
                <div className="headline">Bringing event-goers together</div>
                <hr className="line-break" />
                <div className="headline-text">Find the best things to do all year with our events calendar of 2017's can't-miss happenings.</div>
                {!isAuthenticated ? register : loggedIn}
                <div id="signupModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.closeModal}>&times;</span>
                        <Signup errors={this.state.errors} />
                    </div>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Header);