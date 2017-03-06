import React from 'react';
import classnames from 'classnames';
import validateInput from '../validations/signup.js';
import TextField from './TextField.jsx';
import { browserHistory } from 'react-router';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: {},
            isLoading: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            this.setState({ errors })
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true })

            this.props.userSignupRequest(this.state).then(
                () => {
                    this.context.router.push('/login')
                },
                (err) => this.setState({ errors: err.response.data, isLoading: false })
            )
        }
    }
    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                {/*<TextField
                    type="text"
                    error={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    value={this.state.username}
                    name="username"
                />*/}

                <TextField
                    type="text"
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    value={this.state.email}
                    name="email"
                />

                <TextField
                    type="password"
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    name="password"
                />

                {/*<TextField
                    type="password"
                    error={errors.password2}
                    label="Confirm Password"
                    onChange={this.onChange}
                    value={this.state.password2}
                    name="password2"
                />*/}
                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Sign up
                    </button>
                </div>
            </form>


        );
    }
};

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default SignupForm;
