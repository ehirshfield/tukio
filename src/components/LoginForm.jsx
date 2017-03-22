import React from 'react';
import TextField from "./TextField.jsx";
import validateInput from '../validations/login.js';
import { connect } from 'react-redux';
import { login } from '../actions/authAction.js';




class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            identifier: "",
            password: "",
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangePassword(e) {
        const passwordInput = e.target.value.toLowerCase().trim()
        this.setState({ password: passwordInput })
    }

    onChange(e) {
        this.setState({ identifier: e.target.value })
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

            this.props.login(this.state).then(
                (res) => {
                    this.context.router.push('/userprofile')
                },
                (err) => {
                    if (err.response.data.errors.form === "Wrong Password") {
                        this.setState({ errors: { password: err.response.data.errors.form }, isLoading: false })
                    }

                    if (err.response.data.errors.form === "Username not registered") {
                        this.setState({ errors: { identifier: err.response.data.errors.form }, isLoading: false })
                    }
                }
            )
        }
    }

    render() {
        const { errors, identifier, password, isLoading } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1 id="transform-uppercase">Login</h1>
                <div id="login-input">
                    <TextField
                        type="text"
                        field="identifier"
                        error={errors.identifier}
                        label="Username"
                        onChange={this.onChange}
                        value={identifier}
                        name="identifier"
                    />

                    <TextField
                        field="password"
                        type="text"
                        error={errors.password}
                        label="Password"
                        onChange={this.onChangePassword}
                        value={password}
                        name="password"
                    />

                    <button className="primary" type="submit" disabled={isLoading}>Log in</button>
                </div>
            </form>
        )
    }
}

LoginForm.propTypes = {
    login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);