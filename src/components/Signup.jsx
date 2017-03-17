import React from 'react';
import SignupForm from './SignupForm.jsx';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupAction.js';
import signupLogo from '../../public/assets/img/signuplogo.png';

class Signup extends React.Component {
    render() {
        const { userSignupRequest } = this.props;
        return (
            <div className="row">
                <div className="input-container">
                    <img id="modal-title" src={signupLogo} />
                    <hr />
                    <SignupForm
                        userSignupRequest={userSignupRequest}
                    />
                </div>
            </div>

        );
    }
};

Signup.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
}

export default connect(null, { userSignupRequest })(Signup);
