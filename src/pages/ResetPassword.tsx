import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Auth } from "aws-amplify";

import * as styles from './styles/LoginStyles';

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
            <>
            <styles.BackgroundImage></styles.BackgroundImage>
            <styles.LoginBoxWrapper><styles.LoginBox>
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
                </styles.LoginBox></styles.LoginBoxWrapper>
            </>
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
        <>  
            <styles.LoginTitle>Reset your password</styles.LoginTitle>
            {props.message !== "" && <Alert variant="dark">{props.message}</Alert>}
            <Form onSubmit={props.handleGenerateCode}>
                <styles.FormInputBox
                    type="email"
                    name="email"
                    value={props.email}
                    onChange={props.handleChange}
                    placeholder="E-mail Address"
                    required
                />
                <div>
                    {props.isLoading ?
                        <styles.LoginButton variant="primary" size="lg" className="square-corners" type="submit" block disabled>
                            <Spinner animation="border" size="sm" as="span" />&nbsp;&nbsp;
                            Reset Password
                        </styles.LoginButton>
                        :
                        <styles.LoginButton variant="primary" size="lg" className="square-corners" block type="submit">
                            Reset Password
                        </styles.LoginButton>
                    }
                </div>
                <styles.ReturnLink to={"/login"}>Return to sign in</styles.ReturnLink>
            </Form>
        </>
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
        <>  
            <styles.LoginTitle>Enter verification code</styles.LoginTitle>
            {props.message !== "" && <Alert variant="dark">{props.message}</Alert>}
            <styles.LoginSubtitle>Check your email for a code and enter it below.</styles.LoginSubtitle>
            <Form onSubmit={props.handleSavePassword}>
                <styles.FormInputBox
                    type="text"
                    name="code"
                    value={props.code}
                    onChange={props.handleChange}
                    placeholder="Code"
                    required
                />
                <styles.FormInputBox
                    type="password"
                    name="newPassword"
                    value={props.newPassword}
                    onChange={props.handleChange}
                    placeholder="New Password"
                    required
                />
                <div>
                    {props.isLoading ?
                        <styles.LoginButton variant="primary" size="lg" className="square-corners" type="submit" block disabled>
                            <Spinner animation="border" size="sm" as="span" />&nbsp;&nbsp;
                            Reset Password
                        </styles.LoginButton>
                        :
                        <styles.LoginButton variant="primary" size="lg" className="square-corners" block type="submit">
                            Reset Password
                        </styles.LoginButton>
                    }
                </div>
                <styles.ReturnLink to={"/login"}>Return to sign in</styles.ReturnLink>
            </Form>
        </>
    )
}


export default ResetPassword;
