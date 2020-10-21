import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NavigationLinkProps {
  linkActive: boolean
}

// Component styles
export const NavigationIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  margin-right: 10px;
  transition: color 0.5s ease;
`;

export const NavigationLink = styled(({linkActive, ...rest}) => <Link {...rest} />)<NavigationLinkProps>`
  color: #fff;
  background-image: linear-gradient(to left, #007bff 50%, rgba(0,0,0,0) 50%);
  background-size: 200% 100%;

  ${ ({linkActive}) => (linkActive ? `background-position: -100% 0%;` : ``)}

  border-radius: 3px;
  padding: 10px 20px;
  margin: 2px 0;
  transition: background-position 0.5s ease;

  & > ${NavigationIcon} {
    color: ${ ({linkActive}) => (linkActive ? "#fff" : "#48576c")}; 
  }
  
  &:hover {
    ${ ({linkActive}) => (linkActive ? `
    ` : `
    background-position: -100% 0%;
    `)}

    & > ${NavigationIcon} {
      ${ ({linkActive}) => (linkActive ? `
      ` : `
      color: #fff !important;
      `)}
    }
  }
`;

export const NavigationText = styled.p`
  display: inline-block;
  margin: 0;
  font-weight: 600;
  font-size: 1rem;
  color: #fff;

  @media (max-width: 720px) {
    font-size: 1.2rem;
  }
`;

