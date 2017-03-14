import React from 'react';
// import SignupForm from './SignupForm.jsx';
import { connect } from 'react-redux';
import { commitToBuyRequest } from '../actions/commitAction.js'

class Commit extends React.Component {
    render() {
        const { commitToBuyRequest } = this.props;
        return (
            <div className="row">
                <div className="input-container">
                    <div id="modal-title">Commit to buy this event ticket</div>
                    <hr />
                    <div>The "Commit to buy" option is available on events where the commits goal has not yet been reached. By selecting this option, you are authorizing us to charge the bank card saved in your user profile if enough people commit to buy the event tickets at the displayed price. You can cancel your commit option by clicking "Cancel Commitment" on your home page.</div>
                    <br/>
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg">Commit to buy this event ticket
                        </button>
                    </div>                    
                    {/*<SignupForm
                        userSignupRequest={userSignupRequest}
                    />*/}
                </div>
            </div>

        );
    }
};

// Signup.propTypes = {
//     userSignupRequest: React.PropTypes.func.isRequired,
// }

export default Commit;
