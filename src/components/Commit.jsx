import React from 'react';
import SignupForm from './SignupForm.jsx';
import { connect } from 'react-redux';
import { commitToBuyRequest } from '../actions/commitAction.js'
import { SET_CURRENT_USER } from '../actions/types.js';
import { login } from '../actions/authAction.js';
import { setCurrentUser } from '../actions/authAction.js';
import helpers from '../actions/helpers.js';


class Commit extends React.Component {
  constructor(props) {
      super(props);

      this.onSubmit = this.onSubmit.bind(this);
  }

closeModal() {
    let modal = document.getElementById('commitModal');
    let span = document.querySelector("close");
    modal.style.display = "none";
  } 

onSubmit(e) {
    e.preventDefault();
    this.context.router.push('/progress')
    let modal = document.getElementById('commitModal');
    let span = document.querySelector("close");
    modal.style.display = "none";
}
    render() {
        const { commitToBuyRequest } = this.props;
        return (
        // const { isAuthenticated } = this.props.auth;
        // const user = this.props.auth.user.username;
        // const userLinks = (        
            <div className="row">
                <div className="input-container">
                    <span className="close" onClick={this.closeModal}>&times;</span>
                    <div id="modal-title">Commit to buy this event ticket</div>
                    <hr />
                    <div>The "Commit to buy" option is available on events where the commits goal has not yet been reached. By selecting this option, you are authorizing us to charge the bank card saved in your user profile to buy the event tickets at the displayed price.</div>
                    <br/>
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg">Commit to buy this event ticket
                        </button>
                    </div>          
                    </form>          
                </div>
            </div>
            );
        // )
        /*const guestLinks = (
            <SignupForm userSignupRequest={userSignupRequest}/>
        )
        return (
            <div>
                {isAuthenticated ? userLinks : guestLinks}
            </div>
        );*/
    }
};

// Signup.propTypes = {
//     userSignupRequest: React.PropTypes.func.isRequired,
// }

Commit.propTypes = {
  auth: React.PropTypes.object.isRequired
}

Commit.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Commit);