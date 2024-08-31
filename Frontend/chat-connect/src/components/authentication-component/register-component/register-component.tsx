import { Button, PasswordInput, TextInput } from '@mantine/core';
import classes from './register-component.module.css';
import { Dictionary } from '../../../dictionaries/en';
import { IoEye, IoEyeOff } from 'react-icons/io5';

interface RegisterComponentProps{
    openLogin: () => void
}

const RegisterComponent = ({openLogin}:RegisterComponentProps) =>{
    return (
        <div className={classes.loginWrapper}>
            <span className={classes.titleStyle}>{Dictionary.register}</span>
            <TextInput
                placeholder={Dictionary.username}
                classNames={{input: classes.inputStyle}}
            />
            <TextInput
                placeholder={Dictionary.email}
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
            <Button className={classes.buttonStyle}>{Dictionary.register}</Button>
            <Button className={classes.buttonStyle} onClick={openLogin}>{Dictionary.alreadyHaveAccount}</Button>
        </div>
    );
}

export default RegisterComponent;