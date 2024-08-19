import { Button, PasswordInput, TextInput } from '@mantine/core';
import classes from './register-component.module.css';
import { Dictionary } from '../../dictionaries/en';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const RegisterComponent = () =>{
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
            <Button className={classes.buttonStyle}>{Dictionary.alreadyHaveAccount}</Button>
        </div>
    );
}

export default RegisterComponent;