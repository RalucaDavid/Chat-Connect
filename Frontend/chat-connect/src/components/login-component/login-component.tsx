import { Button, PasswordInput, Text, TextInput } from '@mantine/core';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import classes from './login-component.module.css';

interface LoginComponentProps {
    className?: string;
    children?: React.ReactNode;
}

const LoginComponent = ({ className, children }: LoginComponentProps) => {
    return (
        <div className={classes.loginWrapper}>
            <span className={classes.titleStyle}>Login</span>
            <TextInput
                placeholder="Username"
                classNames={{input: classes.inputStyle}}
            />
            <PasswordInput
                placeholder="Password"
                visibilityToggleIcon={({ reveal }) =>
                    reveal ? (
                        <IoEyeOff />
                    ) : (
                        <IoEye />
                    )
                }
                classNames={{wrapper: classes.passwordWrapper, innerInput: classes.inputPasswordStyle, visibilityToggle: classes.passwordIcon}}
            />
            <Button className={classes.buttonStyle}>Login</Button>
            <Button className={classes.buttonStyle}>Sign up</Button>
        </div>
    );
}

export default LoginComponent;