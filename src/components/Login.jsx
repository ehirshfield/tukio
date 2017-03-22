import React from 'react';
import LoginForm from './LoginForm.jsx';
import sublogo from '../../public/assets/img/sublogo.png';

class Login extends React.Component {
    render() {
        return (
            <div className="login-content">
                <div className="login-box">
                    <a href="/"><span className="arrow-left">&#8592;</span></a>
                    <img id="sublogo" src={sublogo} />
                    <LoginForm />
                </div>
            </div>
        )
    }
}

export default Login;