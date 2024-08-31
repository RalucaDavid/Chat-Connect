
import { useState } from 'react';
import classes from './authentication-component.module.css';
import LoginComponent from './login-component';
import RegisterComponent from './register-component';

const AuthenticationComponent = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div>
            {isLogin ? (
                <LoginComponent openRegister={() => setIsLogin(false)} />
            ) : (
                <RegisterComponent openLogin={() => setIsLogin(true)} />
            )}
        </div>
    );
}

export default AuthenticationComponent;