import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import backgroundImage from './../../assets/loginSplash.jpg';

// Component styles
export const BackgroundImage = styled.div`
  position: fixed;
  z-index: -1;
  width: 105vw;
  height: 105vh;
  left: -2.5vw;
  top: -2.5vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${backgroundImage});
  filter: blur(3px);
`;

export const LoginBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LoginBox = styled.div`
  width: 500px;
  background-color: #fff;
  border-radius: 5px;
  padding: 50px;

  @media (max-width: 720px) {
    width: 90vw;
  }
`;

export const Logo = styled.img`
  width: 25%;
  margin: auto;
  display: block;
  margin-bottom: 15px;
`;

export const LoginTextWrapper = styled.div`
 margin-bottom: 40px;
`;


export const LoginTitle = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
`;

export const LoginSubtitle = styled.p`
`;

export const SubtitleLink = styled.a``;

export const FormInputBox = styled(Form.Control)`
  margin-top: 15px;
`;

export const ForgotPasswordText = styled(Link)`
  text-align: right;
  display: block;
  margin-top: 5px;
`;

export const LoginButton = styled(Button)`
  margin-top: 20px;
  font-size: 1rem;
  font-weight: bold;
`;

export const ReturnLink = styled(Link)`
  text-align: center;
  font-size: 0.9rem;
  display: block;
  margin: 20px 0 0 0;
`;