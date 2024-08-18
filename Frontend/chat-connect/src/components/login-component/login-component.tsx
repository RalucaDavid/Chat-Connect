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
            <Text fw={700} size="xl">Login</Text>
            <TextInput
                placeholder="Username"
                className={classes.inputStyle}
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
                className={classes.inputStyle}
            />
            <Button className={classes.dimensionStyle}>Login</Button>
            <Button className={classes.dimensionStyle}>Don't have an account ? Sign up</Button>
        </div>
    );
}

export default LoginComponent;