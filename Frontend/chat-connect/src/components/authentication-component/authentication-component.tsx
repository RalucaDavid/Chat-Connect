
import { useState } from 'react';
import classes from './authentication-component.module.css';
import LoginComponent from './login-component';
import RegisterComponent from './register-component';

interface AuthenticationComponentProps{
    onLogin: () => void;
}

const AuthenticationComponent = ({onLogin}: AuthenticationComponentProps) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div>
            {isLogin ? (
                <LoginComponent openRegister={() => setIsLogin(false)} onLogin={onLogin} />
            ) : (
                <RegisterComponent openLogin={() => setIsLogin(true)} />
            )}
        </div>
    );
}

export default AuthenticationComponent;