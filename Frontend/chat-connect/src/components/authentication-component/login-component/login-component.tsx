import { Button, PasswordInput, Text, TextInput } from '@mantine/core';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import classes from './login-component.module.css';
import { Dictionary } from '../../../dictionaries/en';

interface LoginComponentProps{
    openRegister: () => void
}

const LoginComponent = ({openRegister}:LoginComponentProps) => {
    return (
        <div className={classes.loginWrapper}>
            <span className={classes.titleStyle}>{Dictionary.login}</span>
            <TextInput
                placeholder={Dictionary.username}
                classNames={{input: classes.inputStyle}}
            />
            <PasswordInput
                placeholder={Dictionary.password}
                visibilityToggleIcon={({ reveal }) =>
                    reveal ? (
                        <IoEyeOff />
                    ) : (
                        <IoEye />
                    )
                }
                classNames={{wrapper: classes.passwordWrapper, innerInput: classes.inputPasswordStyle, visibilityToggle: classes.passwordIcon}}
            />
            <Button className={classes.buttonStyle}>{Dictionary.login}</Button>
            <Button className={classes.buttonStyle} onClick={openRegister}>{Dictionary.createNewAccount}</Button>
        </div>
    );
}

export default LoginComponent;