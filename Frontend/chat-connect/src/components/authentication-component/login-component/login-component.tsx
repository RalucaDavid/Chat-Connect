import { Button, PasswordInput, Text, TextInput } from '@mantine/core';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import classes from './login-component.module.css';
import { Dictionary } from '../../../dictionaries/en';
import { useState } from 'react';
import { login } from '../../../services/user';

interface LoginComponentProps{
    openRegister: () => void;
    onLogin: () => void;
}

const LoginComponent = ({openRegister, onLogin}:LoginComponentProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            setErrorMessage(null);
            const userData = await login(username, password); 
            if (userData) {
                onLogin();
            }
        } catch (error) {
            setErrorMessage(Dictionary.loginFailedMessage);
        }
    }

    return (
        <div className={classes.loginWrapper}>
            <span className={classes.titleStyle}>{Dictionary.login}</span>
            <TextInput
                placeholder={Dictionary.username}
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
                classNames={{input: classes.inputStyle}}
            />
            <PasswordInput
                placeholder={Dictionary.password}
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                visibilityToggleIcon={({ reveal }) =>
                    reveal ? (
                        <IoEyeOff />
                    ) : (
                        <IoEye />
                    )
                }
                classNames={{wrapper: classes.passwordWrapper, innerInput: classes.inputPasswordStyle, visibilityToggle: classes.passwordIcon}}
            />
            <Button className={classes.buttonStyle} onClick={handleLogin}>{Dictionary.login}</Button>
            <Button className={classes.buttonStyle} onClick={openRegister}>{Dictionary.createNewAccount}</Button>
            {errorMessage && <Text size="sm" className={classes.errorMessage}>{errorMessage}</Text>}
        </div>
    );
}

export default LoginComponent;