import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Auth } from "aws-amplify";

const ResetPassword = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // sends email with reset code
    const handleGenerateCode = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");
        setIsLoading(true);
        Auth.forgotPassword(email)
            .then(data => {
                setCodeSent(true);
                setIsLoading(false);
            })
            .catch(err => {
                setMessage(err.message);
                setIsLoading(false);
            });
    }

    // resets password using code
    const handleSavePassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");
        setIsLoading(true);
        Auth.forgotPasswordSubmit(email, code, newPassword)
            .then(data => {
                setMessage("Your password was successfully reset.")
                setIsLoading(false);
            })
            .catch(err => {
                setMessage(err.message)
                setIsLoading(false);
            });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        event.preventDefault();
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "code":
                setCode(value);
                break;
            case "newPassword":
                setNewPassword(value);
                break;
            default:
                break;
        }
    }
    return (
        <Container>
            {codeSent ?
                <ResetPasswordForm
                    code={code}
                    message={message}
                    newPassword={newPassword}
                    handleChange={handleChange}
                    handleSavePassword={handleSavePassword}
                    isLoading={isLoading}
                />
                :
                <GenerateCodeForm
                    email={email}
                    message={message}
                    handleChange={handleChange}
                    handleGenerateCode={handleGenerateCode}
                    isLoading={isLoading}
                />}
        </Container>
    );
};

interface GenerateCodeProps {
    message: string,
    email: string,
    isLoading: boolean,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleGenerateCode: (event: React.FormEvent<HTMLFormElement>) => void
}

const GenerateCodeForm = (props: GenerateCodeProps) => {
    return (
        <div>
            <h3>Reset your password</h3>
            {props.message !== "" && <Alert variant="dark">{props.message}</Alert>}
            <Form onSubmit={props.handleGenerateCode}>
                <Form.Control
                    type="email"
                    name="email"
                    value={props.email}
                    onChange={props.handleChange}
                    placeholder="E-mail Address"
                    required
                />
                <div>
                    <Button type="submit" variant="dark">
                        {props.isLoading && <Spinner animation="border" size="sm" as="span" />}Reset Password
                    </Button>
                </div>
            </Form>
        </div>
    )
}

interface ResetPasswordFormProps {
    message: string,
    isLoading: boolean,
    code: string,
    newPassword: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSavePassword: (event: React.FormEvent<HTMLFormElement>) => void
}

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
    return (
        <div>
            <h3>Enter verification code</h3>
            {props.message !== "" && <Alert variant="dark">{props.message}</Alert>}
            <p>Check your email for a code and enter it below.</p>
            <Form onSubmit={props.handleSavePassword}>
                <Form.Control
                    type="text"
                    name="code"
                    value={props.code}
                    onChange={props.handleChange}
                    placeholder="Code"
                    required
                />
                <Form.Control
                    type="password"
                    name="newPassword"
                    value={props.newPassword}
                    onChange={props.handleChange}
                    placeholder="New Password"
                    required
                />
                <div>
                    <Button type="submit" variant="dark">
                        {props.isLoading && <Spinner animation="border" size="sm" as="span" />}&nbsp;&nbsp;Reset Password
                    </Button>
                </div>
            </Form>
        </div>
    )
}


export default ResetPassword;
