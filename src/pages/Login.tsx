import React, { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useUserData } from '../UserContext';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import LocalingLogo from './../assets/localingLogo.png';

import * as styles from './styles/LoginStyles';

const Login = (props: RouteComponentProps) => {

    let { from } = props.location.state as any || { from: { pathname: "/" } };

    const userData = useUserData();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { value, name } = event.target;

        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        userData.login(username, password);
    }

    return (
        userData.authenticated ?
            <Redirect to={from} />
            :
            <>
                <styles.BackgroundImage></styles.BackgroundImage>
                <styles.LoginBoxWrapper>
                    <styles.LoginBox>
                        <styles.Logo alt={"Localing logo"} src={LocalingLogo} />
                        <Form onSubmit={handleLogin}>
                            <styles.LoginTextWrapper>
                                <styles.LoginTitle>Localing for Business</styles.LoginTitle>
                                <styles.LoginSubtitle>Not a business? <styles.SubtitleLink href="https://localing.co.uk">Localing for customers</styles.SubtitleLink></styles.LoginSubtitle>
                            </styles.LoginTextWrapper>
                            {(userData.loginError) && <Alert variant="danger"> {userData.loginError.message} </Alert>}
                            <styles.FormInputBox
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={username}
                                onChange={handleChange}
                                required
                            />
                            <styles.FormInputBox
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleChange}
                                required
                            />
                            <styles.ForgotPasswordText to={process.env.PUBLIC_URL + "/reset-password"}>
                                Forgot your password?
                            </styles.ForgotPasswordText>
                            <div>
                                <div className="pt-4">
                                    {userData.loading ?
                                        <styles.LoginButton variant="primary" size="lg" className="square-corners" type="submit" block disabled>
                                            <Spinner animation="border" size="sm" as="span" />&nbsp;&nbsp;
                                            Continue
                                        </styles.LoginButton>
                                        :
                                        <styles.LoginButton variant="primary" size="lg" className="square-corners" block type="submit">
                                            Continue
                                        </styles.LoginButton>
                                    }
                                </div>
                            </div>
                        </Form>
                    </styles.LoginBox>
                </styles.LoginBoxWrapper>
            </>
    )
}

export default Login;
