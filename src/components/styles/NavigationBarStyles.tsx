import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

// Component styles
export const StyledNavbar = styled(Navbar)`
  border-bottom: 2px #dddddd solid;
  padding: 10px 50px;

  @media (max-width: 720px) {
    display: none;
  }
`;

export const StyledNavbarBrand = styled(Navbar.Brand)`
  color: #666666 !important;
`;

export const LogoutButton = styled(Button)`
  margin-left: 20px;
`;
