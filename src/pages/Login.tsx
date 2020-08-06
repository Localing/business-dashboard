import React, { useState } from 'react';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';
import { useUserData } from '../UserContext';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const Login = (props: RouteComponentProps) => {

    let { from } = props.location.state as any || { from: { pathname: "/" } };

    const userData = useUserData();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const clearLoginFields = () => {
        setUsername("");
        setPassword("");
    }

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
        clearLoginFields();
    }

    return (
        userData.authenticated ?
            <Redirect to={from} />
            :
            <Container>
                <Form onSubmit={handleLogin}>
                    <h2 className="text-center">Localing for Business</h2>
                    {(userData.loginError) && <Alert variant="danger" dismissible> {userData.loginError.message} </Alert>}
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleChange}
                        required
                    />
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                    <div className="text-right">
                        <Link to={process.env.PUBLIC_URL + "/reset-password"}>
                            Forgot your password?
                        </Link>
                    </div>
                    <div>
                        <div className="pt-4">
                            {userData.loading ?
                                <Button variant="outline-dark" size="lg" className="square-corners" type="submit" block disabled>
                                    <Spinner animation="border" size="sm" as="span" />&nbsp;&nbsp;
                                      Login
                                    </Button>
                                :
                                <Button variant="outline-dark" size="lg" className="square-corners" block type="submit">
                                    Login
                            </Button>
                            }
                        </div>
                    </div>
                </Form>
            </Container>
    )
}

export default Login;
