import React from 'react';
import SignupForm from './SignupForm.jsx';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupAction.js'

class Signup extends React.Component {
    render() {
        const { userSignupRequest } = this.props;
        return (
            <div className="row">
                <div className="input-container">
                    <div id="modal-title">Sign Up for tukio</div>
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
