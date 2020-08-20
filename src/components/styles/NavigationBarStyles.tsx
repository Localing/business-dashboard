import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component styles
export const StyledNavbar = styled(Navbar)`
  padding: 20px 50px;

  @media (max-width: 720px) {
    display: none;
  }
`;

export const Breadcrumbs = styled.p`
  font-weight: 600;
`;

export const BreadcrumbInactive = styled.span`
  color: #6c757d;
`;

export const BreadcrumbLink = styled(Link)``;

export const BreadcrumbActive = styled.span`
  color: #343a40;
`;

export const BreadcrumbDivider = styled(FontAwesomeIcon)`
  color: #6c757d;
  margin: 0 10px;
`;

export const Account = styled.p`
  color: #6c757d;
  font-weight: 600;
  margin: 0;
`;

export const AccountName = styled.span`
  color: #343a40;
  font-weight: 600;
`;

export const LogoutButton = styled(Button)`
  margin-left: 20px;
`;
