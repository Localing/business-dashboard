import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NavigationLinkProps {
  active: boolean
}

// Component styles
export const NavigationLink = styled(Link)<NavigationLinkProps>`
  color: ${ ({active}) => (active ? "#466ed4" : "#666666")};
`;

export const NavigationIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  margin-right: 10px;
`;

export const NavigationText = styled.p`
  display: inline-block;
`;

