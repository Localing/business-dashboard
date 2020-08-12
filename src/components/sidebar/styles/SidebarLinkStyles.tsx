import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NavigationLinkProps {
  linkActive: boolean
}

// Component styles
export const NavigationLink = styled(({linkActive, ...rest}) => <Link {...rest} />)<NavigationLinkProps>`
  color: ${ ({linkActive}) => (linkActive ? "#466ed4" : "#666666")};
`;

export const NavigationIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  margin-right: 10px;
`;

export const NavigationText = styled.p`
  display: inline-block;

  @media (max-width: 720px) {
    font-size: 1.2rem;
  }
`;

