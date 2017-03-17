import React from 'react';
import LoginForm from './LoginForm.jsx';
import sublogo from '../../public/assets/img/sublogo.png';

class Login extends React.Component {
    render() {
        return (
            <div className="login-content">
                <div className="login-box">
                    <img id="sublogo" src={sublogo} />
                        <LoginForm />
                    </div>
            </div>
        )
    }
}

export default Login;