import { Button, PasswordInput, TextInput, Text } from '@mantine/core';
import classes from './register-component.module.css';
import { Dictionary } from '../../../dictionaries/en';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useState } from 'react';
import { register } from '../../../services/autentification';
import User from "../../../models/user";

interface RegisterComponentProps {
    openLogin: () => void
}

const RegisterComponent = ({ openLogin }: RegisterComponentProps) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleRegister = async () => {
        try {
            setErrorMessage(null);
            const user: User = {
                username: username,
                email: email,
                password: password,
            }
            const userData = await register(user);
            if (userData) {
                openLogin();
            }
        } catch (error) {
            setErrorMessage(Dictionary.registerFailedMessage);
        }
    }

    return (
        <div className={classes.loginWrapper}>
            <span className={classes.titleStyle}>{Dictionary.register}</span>
            <TextInput
                placeholder={Dictionary.username}
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
                classNames={{ input: classes.inputStyle }}
            />
            <TextInput
                placeholder={Dictionary.email}
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                classNames={{ input: classes.inputStyle }}
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
                className = {classes.passwordWrapper}
                classNames={{input: classes.inputPassword}}
            />
            <Button className={classes.buttonStyle} onClick={handleRegister}>{Dictionary.register}</Button>
            <Button className={classes.buttonStyle} onClick={openLogin}>{Dictionary.alreadyHaveAccount}</Button>
            {errorMessage &&<Text size="sm" className={classes.errorMessage}>{errorMessage}</Text>}
        </div>
    );
}

export default RegisterComponent;